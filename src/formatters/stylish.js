const createString = (keysData) => {
  const openSymbol = '{';
  const closeSymbol = '}';

  const keys = keysData.map((key) => {
    if (key.type === 'unchanged') return `    ${key.name}: ${key.value}`;

    if (key.type === 'changed') {
      return `  - ${key.name}: ${key.oldValue}\n  + ${key.name}: ${key.newValue}`;
    }

    if (key.type === 'added') return `  + ${key.name}: ${key.value}`;

    return `  - ${key.name}: ${key.value}`;
  });

  return [openSymbol, ...keys, closeSymbol].join('\n');
};

export default createString;
