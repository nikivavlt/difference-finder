const formats = {
  json: JSON.parse,
  yaml: JSON.parse,
  yml: JSON.parse,
};

export default (data, format) => formats[format](data);
