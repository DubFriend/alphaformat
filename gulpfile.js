/* eslint-disable no-process-exit */
const { argv } = require('yargs');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const flowRemoveTypes = require('gulp-flow-remove-types');
const del = require('del');
const flowCopySource = require('flow-copy-source');
const { exec } = require('child_process');

gulp.task('clean-js', () => del('lib/**/*.js'));

gulp.task('clean-flow', () => del('lib/**/*.flow'));

gulp.task(
  'flow',
  () =>
    new Promise((resolve, reject) => {
      exec('npm run flow', (err, stdout, stderr) => {
        if (err) {
          console.log(stdout);
          console.error(stderr);
        }
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
);

gulp.task(
  'transpile',
  gulp.series(gulp.parallel('clean-js', 'flow'), () =>
    gulp
      .src('src/**/*.js')
      .pipe(flowRemoveTypes())
      .pipe(gulp.dest('lib'))
  )
);

gulp.task(
  'flow-copy-source',
  gulp.series(gulp.parallel('clean-flow'), () => flowCopySource(['src'], 'lib'))
);

gulp.task(
  'test',
  gulp.series(gulp.parallel('flow', 'transpile', 'flow-copy-source'), () =>
    gulp
      .src(['lib/**/*.unit.js'])
      .pipe(mocha({ reporter: 'dot', timeout: 3000, grep: argv.grep }))
  )
);

gulp.task('build', gulp.parallel('flow', 'transpile', 'flow-copy-source'));
