// @flow
const parser = require('@babel/parser');
const recast = require('recast');

const parse = (code: string): Object =>
  parser.parse(code, { sourceType: 'module', plugins: ['jsx', 'flow'] });

module.exports = (source: string) =>
  recast.parse(source, { parser: { parse } });
