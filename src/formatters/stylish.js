import { isObject } from '../tools.js';

const openBracket = '{';
const closeBracket = '}';
const spacer = '  ';
const markers = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const createString = (value, depth) => {
  if (!isObject(value)) return value;

  const string = Object
    .entries(value)
    .map(([key, val]) => `${spacer.repeat(depth)}  ${key}: ${createString(val, depth + 2)}`);

  return [
    openBracket,
    ...string,
    `${spacer.repeat(depth - 1)}${closeBracket}`,
  ].join('\n');
};

const formatStylish = (data, depth) => data
  .flatMap((element) => {
    switch (element.type) {
      case 'added':
      case 'deleted':
      case 'unchanged':
        return `${spacer.repeat(depth)}${markers[element.type]} ${element.name}: ${createString(element.value, depth + 2)}`;
      case 'changed':
        return [
          `${spacer.repeat(depth)}${markers.deleted} ${element.name}: ${createString(element.oldValue, depth + 2)}`,
          `${spacer.repeat(depth)}${markers.added} ${element.name}: ${createString(element.newValue, depth + 2)}`,
        ];
      case 'nested':
        return [
          `${spacer.repeat(depth)}  ${element.name}: ${openBracket}`,
          ...formatStylish(element.value, depth + 2),
          `${spacer.repeat(depth + 1)}${closeBracket}`,
        ];
      default:
        throw new Error(`Unknown element type: ${element.type}`);
    }
  });

export default (data) => [openBracket, ...formatStylish(data, 1), closeBracket].join('\n');
