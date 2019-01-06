// @flow

// this is super useful... (set parser to "babylon7"?)
// https://astexplorer.net/

const { expect } = require('chai');
const parse = require('./parse');
const walk = require('./walk');

describe('walk', () => {
  const types = (code: string): Array<string> => {
    const types = [];
    walk(parse(code), node => {
      types.push(node.type);
    });
    return types.slice(2);
  };

  it('should walk an "if else" statement', () => {
    expect(
      types(`
        if(true) {
          5;
        } else if (5) {
          'a';
        } else {
          true;
        }
      `)
    ).to.deep.equal([
      'IfStatement',
      'BooleanLiteral',
      'BlockStatement',
      'ExpressionStatement',
      'NumericLiteral',
      'IfStatement',
      'NumericLiteral',
      'BlockStatement',
      'ExpressionStatement',
      'StringLiteral',
      'BlockStatement',
      'ExpressionStatement',
      'BooleanLiteral',
    ]);
  });

  it('should walk a called function', () => {
    expect(types(`console.log('hi')`)).to.deep.equal([
      'ExpressionStatement',
      'CallExpression',
      'StringLiteral',
    ]);
  });

  it('should walk the params of a function expression', () => {
    expect(types(`let bg = function bar (a) {}`)).to.deep.equal([
      'VariableDeclaration',
      'VariableDeclarator',
      'Identifier',
      'FunctionExpression',
      'Identifier',
      'BlockStatement',
    ]);
  });

  it('should walk a function declaration', () => {
    expect(types(`function foo () {}`)).to.deep.equal([
      'FunctionDeclaration',
      'BlockStatement',
    ]);
  });

  it('should walk an arrow function expression', () => {
    expect(types(`const foo = () => {};`)).to.deep.equal([
      'VariableDeclaration',
      'VariableDeclarator',
      'Identifier',
      'ArrowFunctionExpression',
      'BlockStatement',
    ]);
  });

  it('should walk object decomposition as a variable assignment', () => {
    expect(types(`const { a } = module`)).to.deep.equal([
      'VariableDeclaration',
      'VariableDeclarator',
      'ObjectPattern',
      'ObjectProperty',
      'Identifier',
      'Identifier',
    ]);
  });

  // it('should walk a case statement', () => {});
});
