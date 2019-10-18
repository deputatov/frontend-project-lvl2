const joinPath = (ancestry, name) => (ancestry.length === 0 ? name : `${ancestry}.${name}`);

const convert = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plain = (ast) => {
  const stringBuild = (data, path) => data.map(({
    state, name, currentData, removedData,
  }) => {
    const fullPath = joinPath(path, name);
    const actions = {
      compare: () => stringBuild(currentData, fullPath),
      removed: () => `Property '${fullPath}' was removed`,
      added: () => `Property '${fullPath}' was added with value: ${convert(currentData)}`,
      modified: () => `Property '${fullPath}' was updated. From ${convert(removedData)} to ${convert(currentData)}`,
      unmodified: () => '',
    };
    return actions[state]();
  }).filter((item) => item).join('\n');
  return stringBuild(ast, '');
};

export default plain;
