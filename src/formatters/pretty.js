import flatten from 'lodash/flatten';

const tab = '  ';
const tabsCount = 2;

const convert = (data, indent) => {
  if (!(data instanceof Object)) return data;
  return Object.entries(data).map(([key, value]) => `{\n${indent}${tab.repeat(3)}${key}: ${value}\n${indent}${tab}}`);
};

const renderPretty = (ast) => {
  const genItems = (indentCounter, data) => {
    const indent = tab.repeat(indentCounter);
    const func = ({
      type, key, children, currentData, removedData,
    }) => {
      const actions = {
        nested: () => `${indent}${tab}${key}: {\n${genItems(indentCounter + tabsCount, children)}\n${tab}${indent}}`,
        unmodified: () => `${indent}${tab}${key}: ${convert(currentData, indent)}`,
        removed: () => `${indent}- ${key}: ${convert(removedData, indent)}`,
        added: () => `${indent}+ ${key}: ${convert(currentData, indent)}`,
        modified: () => [actions.added(), actions.removed()],
      };
      return actions[type]();
    };
    return flatten(data.map(func)).join('\n');
  };
  return `{\n${genItems(1, ast)}\n}`;
};

export default renderPretty;
