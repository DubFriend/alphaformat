// @flow

const type = require('@babel/types');

exports.sortObjectKeys = ({ comparator }: *) => ({ node }: *) => {
  node.properties.sort(comparator);
};

exports.insertBreaksOnSwitchCase = ({ insertOnEmptySwitchCase }: *) => ({
  node,
}: *) => {
  const last = node.consequent[node.consequent.length - 1];
  if (
    (!last && insertOnEmptySwitchCase) ||
    (last && last.type !== 'BreakStatement')
  ) {
    node.consequent.push(type.breakStatement());
  }
};
