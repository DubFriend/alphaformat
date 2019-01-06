// @flow

// this is super useful... (set parser to "babylon7"?)
// https://astexplorer.net/

const { expect } = require('chai');
const parse = require('./parse');
const walk = require('./walk');

describe('walk', () => {
  it('should walk an "if else" statement', () => {
    const types = [];
    walk(
      parse(`
        if(true) {
          5;
        } else if (5) {
          'a';
        } else {
          true;
        }
      `),
      node => {
        types.push(node.type);
      }
    );
    expect(types).to.deep.equal([
      'File',
      'Program',
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
    const types = [];
    walk(parse(`console.log('hi')`), node => {
      types.push(node.type);
    });
    expect(types).to.deep.equal([
      'File',
      'Program',
      'ExpressionStatement',
      'CallExpression',
      'StringLiteral',
    ]);
  });

  it('should walk the params of a function expression', () => {
    const types = [];
    walk(parse(`let bg = function bar (a) {};`), node => {
      types.push(node.type);
    });
    expect(types).to.deep.equal([
      'File',
      'Program',
      'VariableDeclaration',
      'VariableDeclarator',
      'FunctionExpression',
      'Identifier',
      'BlockStatement',
    ]);
  });

  it('should walk a function declaration', () => {
    const types = [];
    walk(parse(`function foo () {}`), node => {
      types.push(node.type);
    });
    expect(types).to.deep.equal([
      'File',
      'Program',
      'FunctionDeclaration',
      'BlockStatement',
    ]);
  });

  it('should walk an arrow function expression', () => {
    const types = [];
    walk(parse(`const foo = () => {};`), node => {
      types.push(node.type);
    });
    expect(types).to.deep.equal([
      'File',
      'Program',
      'VariableDeclaration',
      'VariableDeclarator',
      'ArrowFunctionExpression',
      'BlockStatement',
    ]);
  });

  it('should walk object decomposition as a variable assignment', () => {
    // const {a, b} = module
    const types = [];
    walk(parse(`const { a } = module`), node => {
      types.push(node.type);
    });
    expect(types).to.deep.equal([
      'File',
      'Program',
      'VariableDeclaration',
      'VariableDeclarator',
      'ObjectPattern',
      'ObjectProperty',
      'Identifier',
    ]);
  });

  it('should walk a case statement', () => {});
});
