// @flow

exports.hi = (): string => 'hi';
const parser = require('@babel/parser');
const generator = require('@babel/generator');

console.log(generator);

exports.parse = (code: string): Object =>
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  });

exports.generate = (ast: Object): string => generator.default(ast).code;
