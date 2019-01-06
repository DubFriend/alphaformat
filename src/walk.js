// @flow

// this is super useful... (set parser to "babylon7"?)
// https://astexplorer.net/
const walk = (node: Object, cb: (*) => void) => {
  cb(node);
  switch (node.type) {
    case 'File':
      walk(node.program, cb);
      break;
    case 'Program':
      node.body.map(n => walk(n, cb));
      break;
    case 'VariableDeclaration':
      node.declarations.map(n => walk(n, cb));
      break;
    case 'VariableDeclarator':
      walk(node.init, cb);
      break;
    case 'FunctionExpression':
      walk(node.body, cb);
      break;
    case 'BlockStatement':
      node.body.map(n => walk(n, cb));
      break;
    case 'ObjectExpression':
      node.properties.map(n => walk(n, cb));
      break;
    case 'ObjectProperty':
      walk(node.value, cb);
      break;
    // Flow Type Declaration
    case 'TypeAlias':
      walk(node.right, cb);
      break;
    case 'ObjectTypeAnnotation':
      node.properties.map(n => walk(n, cb));
      break;
  }
};

module.exports = walk;
