// @flow
const parse = require('./parse');
const print = require('./print');
const walk = require('./walk');
const { rules } = require('./rules');

exports.transform = ({
  source,
  options,
}: {|
  source: string,
  options?: {
    SortObjectKeys?: { comparator?: (a: string, b: string) => number },
    InsertBreaksOnSwitchCase?: { insertOnEmptySwitchCase?: boolean },
  },
|}): string => {
  const opt = options || {};

  const map = rules
    .filter(Rule => opt[Rule.name])
    .map(Rule => new Rule(opt[Rule.name]))
    .reduce((acc, rule) => {
      rule.types.forEach(type => {
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(rule);
      });
      return acc;
    }, {});

  const config = {};

  for (const key in map) {
    config[key] = p => {
      map[key].forEach(rule => {
        rule.run(p);
      });
    };
  }

  const ast = parse(source);
  walk(ast, config);
  return print(ast);
};
