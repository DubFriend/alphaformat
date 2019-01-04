// @flow
const { expect } = require('chai');
const { parse } = require('./index');

describe('parse', () => {
  it('should parse into an AST', async () => {
    console.log(
      parse(`
const foo = 5;

const bar = {
  a: 5,
  b: 6
};

function bar (a) {
  return foo;
}`).program.body
    );
  });
});
