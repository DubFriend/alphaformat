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

  const BlockStatement = ['BlockStatement'];
  const Identifier = ['Identifier'];
  const VariableDeclaration = ['VariableDeclaration', 'VariableDeclarator'];
  const IdentityVariableDeclaration = [...VariableDeclaration, 'Identifier'];
  const ExpressionStatement = ['ExpressionStatement'];

  it('should walk variable assignment', () => {
    expect(types('const foo = 5')).to.deep.equal([
      ...IdentityVariableDeclaration,
      'NumericLiteral',
    ]);
  });

  it('should walk a block statement', () => {
    expect(types('{ 5 }')).to.deep.equal([
      ...BlockStatement,
      ...ExpressionStatement,
      'NumericLiteral',
    ]);
  });

  it('should walk an "if, else if, else" statement', () => {
    expect(types(`if(true) {} else if (5) {} else {}`)).to.deep.equal([
      'IfStatement',
      'BooleanLiteral',
      ...BlockStatement,
      'IfStatement',
      'NumericLiteral',
      ...BlockStatement,
      ...BlockStatement,
    ]);
  });

  it('should walk a ternary expression', () => {
    expect(types('true ? 1 : 2;')).to.deep.equal([
      ...ExpressionStatement,
      'ConditionalExpression',
      'BooleanLiteral',
      'NumericLiteral',
      'NumericLiteral',
    ]);
  });

  it('should walk a try catch finally expression', () => {
    expect(types('try {} catch(err) {} finally {}')).to.deep.equal([
      'TryStatement',
      ...BlockStatement,
      'CatchClause',
      ...Identifier,
      ...BlockStatement,
      ...BlockStatement,
    ]);
  });

  it('should walk a called function', () => {
    expect(types('console.log("hi")')).to.deep.equal([
      ...ExpressionStatement,
      'CallExpression',
      'StringLiteral',
    ]);
  });

  it('should walk the params of a function expression', () => {
    expect(types(`let bg = function bar (a) {}`)).to.deep.equal([
      ...IdentityVariableDeclaration,
      'FunctionExpression',
      ...Identifier,
      ...BlockStatement,
    ]);
  });

  it('should walk a function declaration', () => {
    expect(types(`function foo () {}`)).to.deep.equal([
      'FunctionDeclaration',
      ...BlockStatement,
    ]);
  });

  it('should walk an arrow function expression', () => {
    expect(types(`const foo = () => {}`)).to.deep.equal([
      ...IdentityVariableDeclaration,
      'ArrowFunctionExpression',
      ...BlockStatement,
    ]);
  });

  it('should walk object decomposition', () => {
    expect(types(`var { a } = module`)).to.deep.equal([
      ...VariableDeclaration,
      'ObjectPattern',
      'ObjectProperty',
      ...Identifier,
      ...Identifier,
    ]);
  });

  it('should walk object keys of Flow type', () => {
    expect(types('type Foo = {| a: string |}')).to.deep.equal([
      'TypeAlias',
      'ObjectTypeAnnotation',
      'ObjectTypeProperty',
    ]);
  });

  it('should walk case statement', () => {
    expect(
      types(`switch(true) {
        case 'a':
          break;
        default:
          break;
      }`)
    ).to.deep.equal([
      'SwitchStatement',
      'BooleanLiteral',
      'SwitchCase',
      'StringLiteral',
      'BreakStatement',
      'SwitchCase',
      'BreakStatement',
    ]);
  });
});
