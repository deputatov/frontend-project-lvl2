const tab = '  ';
const tabsCount = 2;

const convert = (data, indent) => {
  if (data instanceof Object) {
    return Object.entries(data).map(([key, value]) => `{\n${indent}${tab.repeat(3)}${key}: ${value}\n${indent}${tab}}`);
  }
  return data;
};

const getExtraIndent = (data) => (data.find((value) => (
  value.state === 'added' || value.state === 'removed' || value.state === 'modified')) ? 1 : 0);

const pretty = (ast) => {
  const stringBuild = (data, indentCounter) => {
    const indent = tab.repeat(indentCounter);
    const extraIndent = tab.repeat(getExtraIndent(data));
    return data.map(({
      state, name, currentData, removedData,
    }) => {
      const actions = {
        compare: () => `${indent}${extraIndent}${name}: {\n${stringBuild(currentData, indentCounter + tabsCount)}\n${extraIndent}${indent}}`,
        unmodified: () => `${indent}${extraIndent}${name}: ${convert(currentData, indent)}`,
        removed: () => `${indent}- ${name}: ${convert(removedData, indent)}`,
        added: () => `${indent}+ ${name}: ${convert(currentData, indent)}`,
        modified: () => `${indent}+ ${name}: ${convert(currentData, indent)}\n${indent}- ${name}: ${convert(removedData, indent)}`,
      };
      return actions[state]();
    }).join('\n');
  };
  return `{\n${stringBuild(ast, 1)}\n}`;
};

export default pretty;
