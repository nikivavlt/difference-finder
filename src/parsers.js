import yaml from 'js-yaml';

const fileExtensions = {
  json: JSON.parse,
  yml: yaml.load,
};

const parse = (data, extension) => fileExtensions[extension](data);

export default parse;
