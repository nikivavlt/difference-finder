import { isObject } from "../tools.js";

const getValue = (value) => {
  if (isObject(value)) {
    const entries = Object
      .entries(value)
      .map(([key, val]) => `{${key}:${getValue(val)}}`);
    return [...entries].join('');
  }

  return value;
};

const createJSON = (data) => {
  const json = data.map((element) => {
    if (element.type === 'nested') return `{"name":"${element.name}","type":"parent","children":${createJSON(element.value)}}`;

    if (element.type === 'changed') return `{"name":"${element.name}","type":"${element.type}","oldValue":"${getValue(element.oldValue)},"newValue":"${getValue(element.newValue)}"}`;

    return `{"name":"${element.name}","type":"${element.type}","value":"${getValue(element.value)}"}`;
  });

  return ['[', ...json, ']'].join('');
};

export default createJSON;
