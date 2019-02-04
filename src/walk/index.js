// @flow

const traverse = require('@babel/traverse').default;

module.exports = traverse;

// // why not outsource the walking?
// // https://github.com/acornjs/acorn/tree/master/acorn-walk
// // https://github.com/pugjs/babylon-walk
// // https://github.com/babel/babel/tree/master/packages/babel-traverse

// // this is super useful... (set parser to "babylon7"?)
// // https://astexplorer.net/
// const walk = (node: Object, cb: (*) => void) => {
//   if (!node) {
//     return;
//   }

//   cb(node);
//   switch (node.type) {
//     case 'File':
//       walk(node.program, cb);
//       break;
//     case 'Program':
//       node.body.map(n => walk(n, cb));
//       break;
//     case 'VariableDeclaration':
//       node.declarations.map(n => walk(n, cb));
//       break;
//     case 'VariableDeclarator':
//       walk(node.id, cb);
//       walk(node.init, cb);
//       break;
//     case 'IfStatement':
//       walk(node.test, cb);
//       walk(node.consequent, cb);
//       walk(node.alternate, cb);
//       break;
//     case 'TryStatement':
//       walk(node.block, cb);
//       walk(node.handler, cb);
//       walk(node.finalizer, cb);
//       break;
//     case 'CatchClause':
//       walk(node.param, cb);
//       walk(node.body, cb);
//       break;
//     case 'SwitchStatement':
//       walk(node.discriminant, cb);
//       node.cases.map(n => walk(n, cb));
//       break;
//     case 'SwitchCase':
//       walk(node.test, cb);
//       node.consequent.map(n => walk(n, cb));
//       break;
//     case 'ExpressionStatement':
//       walk(node.expression, cb);
//       break;
//     case 'ConditionalExpression':
//       walk(node.test, cb);
//       walk(node.consequent, cb);
//       walk(node.alternate, cb);
//       break;
//     case 'FunctionExpression':
//     case 'FunctionDeclaration':
//     case 'ArrowFunctionExpression':
//       node.params.map(n => walk(n, cb));
//       walk(node.body, cb);
//       break;
//     case 'BlockStatement':
//       node.body.map(n => walk(n, cb));
//       break;
//     case 'ObjectExpression':
//       node.properties.map(n => walk(n, cb));
//       break;
//     case 'ObjectPattern':
//       node.properties.map(n => walk(n, cb));
//       break;
//     case 'ObjectProperty':
//       walk(node.value, cb);
//       break;
//     // Flow Type Declaration
//     case 'TypeAlias':
//       walk(node.right, cb);
//       break;
//     case 'ObjectTypeAnnotation':
//       node.properties.map(n => walk(n, cb));
//       break;
//     case 'CallExpression':
//       node.arguments.map(n => walk(n, cb));
//   }
// };

// module.exports = walk;
