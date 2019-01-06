// @flow
const recast = require('recast');

module.exports = (ast: Object): string => recast.print(ast).code;
