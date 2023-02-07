const openBracket = '{';
const closeBracket = '}';
const spacer = ' ';

const isNotObject = (data) => (typeof data !== 'object' || data === null);

const createString = (value, depth) => {
  if (isNotObject(value)) return value;

  const string = Object
    .entries(value)
    .map(([key, val]) => `${spacer.repeat(depth)}${key}: ${createString(val, depth + 4)}`);

  return [
    openBracket,
    ...string,
    `${spacer.repeat(depth - 4)}${closeBracket}`,
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

    switch (type) {
      case 'added':
      case 'deleted':
      case 'unchanged':
        return `${spacer.repeat(depth)}${name}: ${createString(value, depth + 4)}`;
      case 'changed':
        return [
          `${spacer.repeat(depth)}${name}: ${createString(oldValue, depth + 4)}`,
          `${spacer.repeat(depth)}${name}: ${createString(newValue, depth + 4)}`,
        ];
      case 'nested':
        return [
          `${spacer.repeat(depth)}${name}: ${openBracket}`,
          ...makeString(value, depth + 4),
          `${spacer.repeat(depth)}${closeBracket}`,
        ];
      default:
        break;
    }
  });

  return [openBracket, ...makeString(data, 4), closeBracket].join('\n');
};

export default stringify;
