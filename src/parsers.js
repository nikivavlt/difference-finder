import yaml from 'js-yaml';

const fileExtension = {
  json: JSON.parse,
  yml: yaml.load,
};

const parse = (data, extension) => fileExtension[extension](data);

export default parse;
