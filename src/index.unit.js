// @flow
const { expect } = require('chai');
const { transform } = require('./index');

describe('transform', () => {
  it('should return code unmodified by default', () => {
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
    expect(transform({ source })).to.equal(source);
  });

  it('should have option "sortObjectKeys"', () => {
    expect(
      transform({
        source: `
          var bar = {
            b: { n: 1, m: 2 },
            a: 5
          };`,
        options: { sortObjectKeys: (a, b) => (a > b ? -1 : 1) },
      })
    ).to.equal(`
          var bar = {
            a: 5,
            b: { m: 2, n: 1 }
          };`);
  });

  // it('should have option to "enforceBreaksOnCaseStatement"', () => {});

  // it('should have option to "sortCaseStatementsCondition"', () => {})
  // it('s "sortCaseStatementsCondition" option should internally sort a case statements grouped "fall through" cases', () => {})

  // it('should have option to "sortFlowObjectKeys"', () => {})
  // it('s "sortFlowObjectKeys" option should internally sort a nested Flow object keys', () => {})

  // it('should have option to ');
});
