import plain from './plain';
import pretty from './pretty';

const formatters = {
  plain,
  pretty,
};

export default (data, format) => formatters[format](data);
