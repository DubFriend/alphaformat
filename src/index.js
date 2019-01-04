// @flow

exports.hi = (): string => 'hi';
const parser = require('@babel/parser');

exports.parse = (code: string) =>
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  });
