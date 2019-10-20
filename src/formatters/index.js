import renderPlain from './plain';
import renderPretty from './pretty';
import renderJSON from './json';

const formatters = {
  plain: renderPlain,
  pretty: renderPretty,
  json: renderJSON,
};

export default (data, format) => formatters[format](data);
