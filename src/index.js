// @flow
const parse = require('./parse');
const print = require('./print');
const walk = require('./walk');

exports.transform = ({
  source,
  options,
}: {|
  source: string,
  options?: { sortObjectKeys?: (a: string, b: string) => number },
|}): string => {
  const ast = parse(source);

  const opt = options || {};

  if (opt.sortObjectKeys) {
    walk(ast, n => {
      if (n.type === 'ObjectExpression') {
        n.properties.sort(opt.sortObjectKeys);
      }
    });
  }

  return print(ast);
};
