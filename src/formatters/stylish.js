/*const stringify = (data, replacer = ' ', spacesCount = 1) => {
  const makeString = (currentData, depth) => {
    const openBracket = '{';
    const closeBracket = '}';

    if (isNotObject(currentData)) return `${currentData}`;

    const spaceSize = spacesCount * depth;
    const space = replacer.repeat(spaceSize);
    const bracketSpace = replacer.repeat(spaceSize - spacesCount);
    const string = Object
      .entries(currentData)
      .map(([key, value]) => `${space}${key}: ${makeString(value, depth + 1)}`);

    return [
      openBracket,
      ...string,
      `${bracketSpace}${closeBracket}`,
    ].join('\n');
  };

  return makeString(data, 1);
};*/

const isObject = (data) => (typeof data === 'object' && data !== null);

const stringify = (data) => {
  const makeString = (currentData, depth) => {
    const space = ' '.repeat(depth);
    const bracketSpace = ' '.repeat(depth + 1);
    const openBracket = '{';
    const closeBracket = '}';

    const string = currentData.map((key) => {
      if (key.type === 'unchanged') return `${space}  ${key.name}: ${key.value}`;

      if (key.type === 'changed') {
        return `${space}- ${key.name}: ${key.oldValue}\n${space}+ ${key.name}: ${key.newValue}`;
      }

      if (isObject(key.value)) {
        return `${space}  ${key.name}: ${makeString(key.value, depth + 1)}`;
      }

      if (key.type === 'added') return `${space}+ ${key.name}: ${key.value}`;

      return `${space}- ${key.name}: ${key.value}`;
    });

    return [
      openBracket,
      ...string,
      `${bracketSpace}${closeBracket}`,
    ].join('\n');
  };

  return makeString(data, 1);
};

export default stringify;
