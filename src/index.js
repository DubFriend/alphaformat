// @flow
const parse = require('./parse');
const print = require('./print');
const walk = require('./walk');
const { sortObjectKeys, insertBreaksOnSwitchCase } = require('./rules');

exports.transform = ({
  source,
  options,
}: {|
  source: string,
  options?: {
    sortObjectKeys?: { comparator?: (a: string, b: string) => number },
    insertBreaksOnSwitchCase?: { insertOnEmptySwitchCase?: boolean },
  },
|}): string => {
  const ast = parse(source);

  const opt = options || {};

  if (opt.sortObjectKeys) {
    walk(ast, { ObjectExpression: sortObjectKeys(opt.sortObjectKeys) });
  }

  if (opt.insertBreaksOnSwitchCase) {
    walk(ast, {
      SwitchCase: insertBreaksOnSwitchCase(opt.insertBreaksOnSwitchCase),
    });
  }

  return print(ast);
};
