import { isObject } from "../tools.js";

const getValue = (value) => {
  if (isObject(value)) {
    console.log(value)
    const { key, val } = value;
    return `${key}${val}`;
  }

  return value;
};

const createJSON = (data) => {
  const json = data.map((element) => {
    if (element.type === 'nested') return `{"name":"${element.name}","type":"parent","children":${createJSON(element.value)}}`;

    return `{"name":"${element.name}","type":"${element.type}","value":"${getValue(element.value)}"}`;
  });

  return ['[', ...json, ']'].join('');
};

export default createJSON;
