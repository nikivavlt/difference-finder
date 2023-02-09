const openBracket = '{';
const closeBracket = '}';
const spacer = ' ';

const isNotObject = (data) => (typeof data !== 'object' || data === null);

const createString = (value, depth) => {
  if (isNotObject(value)) return value;

  const string = Object
    .entries(value)
    .map(([key, val]) => `${spacer.repeat(depth + 2)}  ${key}: ${createString(val, depth + 4)}`);

  return [
    openBracket,
    ...string,
    `${spacer.repeat(depth)}${closeBracket}`,
  ].join('\n');
};

const stringify = (data) => {
  const makeString = (currentData, depth) => currentData.flatMap((element) => {
    const {
      name,
      value,
      type,
      oldValue,
      newValue,
    } = element;

    const typeSymbol = {
      added: '+',
      deleted: '-',
      unchanged: ' ',
    };

    switch (type) {
      case 'added':
      case 'deleted':
      case 'unchanged':
        return `${spacer.repeat(depth)}${typeSymbol[type]} ${name}: ${createString(value, depth + 2)}`;
      case 'changed':
        return [
          `${spacer.repeat(depth)}${typeSymbol.deleted} ${name}: ${createString(oldValue, depth + 2)}`,
          `${spacer.repeat(depth)}${typeSymbol.added} ${name}: ${createString(newValue, depth + 2)}`,
        ];
      case 'nested':
        return [
          `${spacer.repeat(depth)}  ${name}: ${openBracket}`,
          ...makeString(value, depth + 4),
          `${spacer.repeat(depth + 2)}${closeBracket}`,
        ];
      default:
        break;
    }
  });

  return [openBracket, ...makeString(data, 2), closeBracket].join('\n');
};

export default stringify;
