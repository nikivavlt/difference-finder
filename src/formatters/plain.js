const isObject = (data) => (typeof data === 'object' && data !== null);

const stringifyValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (data) => {
  const iter = (tree, parentName) => tree.flatMap((node) => {
    const fullName = parentName === '' ? node.name : `${parentName}.${node.name}`;
    switch (node.type) {
      case 'added':
        return `Property '${fullName}' was added with value: ${stringifyValue(node.value)}`;
      case 'deleted':
        return `Property '${fullName}' was removed`;
      case 'changed':
        return `Property '${fullName}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
      case 'nested':
        return iter(node.value, fullName);
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return iter(data, '').filter((element) => element !== null).join('\n');
};
