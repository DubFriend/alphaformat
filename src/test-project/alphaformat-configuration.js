module.exports = {
  ignore: ['node_modules/*', 'build/*'],
  rules: {
    sortObjectKeys: (a, b) => (a > b ? -1 : 1),
  },
  customRules: [
    {
      name: 'foo',
      walk: node => {
        if (n.type === 'Identifier') {
          n.type.name = n.type.name + 'Foo';
        }
      },
    },
  ],
};
