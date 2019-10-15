const getKeys = (dataBefore, dataAfter) => [
  ...new Set([...Object.keys(dataBefore), ...Object.keys(dataAfter)]),
];

const diff = (dataBefore, dataAfter) => getKeys(dataBefore, dataAfter)
  .map((key) => {
    if (dataBefore[key] instanceof Object && dataAfter[key] instanceof Object) {
      return {
        state: 'compare', name: key, currentData: diff(dataBefore[key], dataAfter[key]),
      };
    }
    if (dataBefore[key] === dataAfter[key]) {
      return {
        state: 'unmodified', name: key, currentData: dataBefore[key],
      };
    }
    if (key in dataBefore && !(key in dataAfter)) {
      return {
        state: 'removed', name: key, removedData: dataBefore[key],
      };
    }
    if (key in dataAfter && !(key in dataBefore)) {
      return {
        state: 'added', name: key, currentData: dataAfter[key],
      };
    }
    return {
      state: 'modified', name: key, currentData: dataAfter[key], removedData: dataBefore[key],
    };
  });

export default diff;
