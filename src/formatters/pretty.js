const turnToString = (data, indent) => {
  if (data instanceof Object) {
    return Object.entries(data).map(([key, value]) => `{\n${indent}      ${key}: ${value}\n${indent}  }`);
  }
  return data;
};

const pretty = (ast) => {
  const tab = '  ';
  const stringBuilder = (data, indentCounter) => {
    const indent = tab.repeat(indentCounter);
    return data.map(({
      state, name, currentData, removedData,
    }) => {
      if (state === 'compare' && currentData instanceof Array) {
        return `${indent}  ${name}: {\n${stringBuilder(currentData, indentCounter + 2)}\n${indent}  }`;
      }
      if (state === 'unmodified') {
        return `${indent}  ${name}: ${turnToString(currentData, indent)}`;
      }
      if (state === 'removed') {
        return `${indent}- ${name}: ${turnToString(removedData, indent)}`;
      }
      if (state === 'added') {
        return `${indent}+ ${name}: ${turnToString(currentData, indent)}`;
      }
      return `${indent}+ ${name}: ${turnToString(currentData, indent)}\n${indent}- ${name}: ${turnToString(removedData, indent)}`;
    }).join('\n');
  };
  return `{\n${stringBuilder(ast, 1)}\n}`;
};

export default pretty;
