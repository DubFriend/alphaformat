// @flow

const { expect } = require('chai');
const parse = require('./parse');
const walk = require('./walk');

describe('walk', () => {
  it('should walk the ast, calling the callback on relevant nodes', () => {
    const source = `
    // @flow

    type Foo = {|
      a: number,
      b: string
    |}

    // comment

    const foo = 5;

    let bg = function bar (a) {
      return foo;
    };
    `;
    const ast = parse(source);
    const types = [];
    walk(ast, node => {
      types.push(node.type);
    });
    expect(types).to.deep.equal([
      'File',
      'Program',
      'TypeAlias',
      'ObjectTypeAnnotation',
      'ObjectTypeProperty',
      'ObjectTypeProperty',
      'VariableDeclaration',
      'VariableDeclarator',
      'NumericLiteral',
      'VariableDeclaration',
      'VariableDeclarator',
      'FunctionExpression',
      'BlockStatement',
      'ReturnStatement',
    ]);
  });
});
