// @flow

const type = require('@babel/types');

class Rule {
  types: Array<string>;
  constructor({ types }: {| types: Array<string> |}) {
    this.types = types;
  }

  run({ node }: *) {
    throw new Error('Implement Me');
  }
}

class SortObjectKeys extends Rule {
  comparator: (a: string, b: string) => number;
  constructor({ comparator }: *) {
    super({ types: ['ObjectExpression'] });
    this.comparator = comparator;
  }

  run({ node }: *) {
    node.properties.sort(this.comparator);
  }
}

class InsertBreaksOnSwitchCase extends Rule {
  insertOnEmptySwitchCase: boolean;
  constructor({ insertOnEmptySwitchCase }: *) {
    super({ types: ['SwitchCase'] });
    this.insertOnEmptySwitchCase = insertOnEmptySwitchCase === true;
  }

  run({ node }: *) {
    const last = node.consequent[node.consequent.length - 1];
    if (
      (!last && this.insertOnEmptySwitchCase) ||
      (last && last.type !== 'BreakStatement')
    ) {
      node.consequent.push(type.breakStatement());
    }
  }
}

module.exports = { rules: [SortObjectKeys, InsertBreaksOnSwitchCase] };
