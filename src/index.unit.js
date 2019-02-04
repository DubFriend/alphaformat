// @flow
const { expect } = require('chai');
const { transform } = require('./index');

describe('transform', () => {
  it('should return code unmodified by default', () => {
    const source = `
      // @flow

    type Foo =  {|
      a: number,
       b: string
  |}

     // comment

const foo =  5;

    let bg = function bar ( a  ) {
      return  foo ;
     };
    /* return  foo ;
      */`;
    expect(transform({ source })).to.equal(source);
  });

  describe('option.SortObjectKeys', () => {
    it('should have option "sortObjectKeys"', () => {
      expect(
        transform({
          source: `
          var bar = {
            b: { n: 1, m: 2 },
            a: 5
          };`,
          options: {
            SortObjectKeys: { comparator: (a, b) => (a > b ? -1 : 1) },
          },
        })
      ).to.equal(`
          var bar = {
            a: 5,
            b: { m: 2, n: 1 }
          };`);
    });
  });

  // it('should have option to sortDestructuredObject', () => {
  //   expect(
  //     transform({
  //       source: `
  //         const foo = ({ b, a }) => {};`,
  //       options: { sortDestructuredObject: (a, b) => (a > b ? -1 : 1) },
  //     })
  //   ).to.equal(`
  //         const foo = ({ a, b }) => {};`);
  // });

  describe('InsertBreaksOnSwitchCase', () => {
    it('should have option to "insertBreaksOnSwitchCase"', () => {
      expect(
        transform({
          source: `
            switch('foo') {
              case 'foo':
                console.log('a');
            }`,
          options: {
            InsertBreaksOnSwitchCase: { insertOnEmptySwitchCase: false },
          },
        })
      ).to.equal(`
            switch('foo') {
              case 'foo':
                console.log('a');
                break;
            }`);
    });

    it('should not insert if case statement is empty', () => {
      expect(
        transform({
          source: `
            switch('foo') {
              case 'foo':
            }`,
          options: {
            InsertBreaksOnSwitchCase: { insertOnEmptySwitchCase: false },
          },
        })
      ).to.equal(`
            switch('foo') {
              case 'foo':
            }`);
    });

    it('should have option to "insertOnEmptySwitchCase"', () => {
      expect(
        transform({
          source: `
            switch('foo') {
              case 'foo':
            }`,
          options: {
            InsertBreaksOnSwitchCase: { insertOnEmptySwitchCase: true },
          },
        })
      ).to.equal(`
            switch('foo') {
              case 'foo':
                break;
            }`);
    });
  });

  // it('should have option to "sortCaseStatementsCondition"', () => {})
  // it(`s "sortCaseStatementsCondition" option should internally sort a case
  //   statements grouped "fall through" cases`, () => {});

  // it('should have option to "sortFlowObjectKeys"', () => {})
  // it`'s "sortFlowObjectKeys" option should internally sort a nested Flow object
  // keys`, () => {});

  // it(`should have option to break strings using "+" operator at desired
  //   character limit`, () => {});

  // it(`should have option to break strings using "\`\`" at a desired
  //   character limit`, () => {});

  // it(`should have option to sort adjacent variable declarations at top
  //   nesting level of the same type (const, var, let) under conditions:
  //   `, () => {});

  // it('should have option to sort describe, it blocks of mocha tests')
});
