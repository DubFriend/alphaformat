// @flow
const { expect } = require('chai');
const { parse, generate } = require('./index');

const source = `
const foo = 5;

var bar = {
  a: 5,
  b: 6
};

let bg = function bar (a) {
  return foo;
}`;

describe('parse', () => {
  it('should parse into an AST', async () => {
    console.log(parse(source).program.body[0]);
  });

  it('should return original source unmodified', async () => {
    console.log(generate(parse(source)));
  });
});
