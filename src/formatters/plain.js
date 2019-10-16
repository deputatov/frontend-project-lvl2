const getNewPath = (ancestry, name) => (ancestry.length === 0 ? name : `${ancestry}.${name}`);

const convert = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plain = (ast) => {
  const stringBuilder = (data, path) => data.map(({
    state, name, currentData, removedData,
  }) => {
    const newAncestry = getNewPath(path, name);
    if (state === 'compare' && currentData instanceof Array) {
      return stringBuilder(currentData, newAncestry);
    }
    if (state === 'removed') {
      return `Property '${newAncestry}' was removed`;
    }
    if (state === 'added') {
      return `Property '${newAncestry}' was added with value: ${convert(currentData)}`;
    }
    if (state === 'modified') {
      return `Property '${newAncestry}' was updated. From ${convert(removedData)} to ${convert(currentData)}`;
    }
    return false;
  }).filter((item) => item).join('\n');
  return stringBuilder(ast, '');
};

export default plain;
