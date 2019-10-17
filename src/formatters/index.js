import plain from './plain';
import pretty from './pretty';
import json from './json';

const formatters = {
  plain,
  pretty,
  json,
};

export default (data, format) => formatters[format](data);
