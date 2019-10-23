import flatten from 'lodash/flatten';

const tab = '  ';
const tabsCount = 2;

const convert = (data, currentDepth) => {
  if (!(data instanceof Object)) {
    return data;
  }
  const indent = tab.repeat((currentDepth + 1) * tabsCount);
  const closingIndent = tab.repeat(currentDepth * tabsCount);
  return Object.entries(data).map(([key, value]) => `{\n${indent}${key}: ${value}\n${closingIndent}}`);
};

const renderPretty = (ast) => {
  const genItems = (data, currentDepth) => {
    const indent = tab.repeat(currentDepth * tabsCount);
    const indentForSighn = tab.repeat(currentDepth * tabsCount - 1);
    const func = ({
      type, key, children, currentData, removedData,
    }) => {
      const actions = {
        nested: () => `${indent}${key}: {\n${genItems(children, currentDepth + 1)}\n${indent}}`,
        unmodified: () => `${indent}${key}: ${convert(currentData, currentDepth)}`,
        removed: () => `${indentForSighn}- ${key}: ${convert(removedData, currentDepth)}`,
        added: () => `${indentForSighn}+ ${key}: ${convert(currentData, currentDepth)}`,
        modified: () => [actions.added(), actions.removed()],
      };
      return actions[type]();
    };
    return flatten(data.map(func)).join('\n');
  };
  return `{\n${genItems(ast, 1)}\n}`;
};

export default renderPretty;
