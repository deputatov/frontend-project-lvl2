const joinPath = (ancestry, name) => (ancestry.length === 0 ? name : `${ancestry}.${name}`);

const convert = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (value instanceof Object) return '[complex value]';
  return value;
};

const renderPlain = (ast, path = '') => {
  const func = ({
    type, key, children, currentData, removedData,
  }) => {
    const fullPath = joinPath(path, key);
    const actions = {
      nested: () => renderPlain(children, fullPath),
      removed: () => `Property '${fullPath}' was removed`,
      added: () => `Property '${fullPath}' was added with value: ${convert(currentData)}`,
      modified: () => `Property '${fullPath}' was updated. From ${convert(removedData)} to ${convert(currentData)}`,
      unmodified: () => '',
    };
    return actions[type]();
  };
  return ast.map(func).filter((item) => item).join('\n');
};

export default renderPlain;
