import union from 'lodash/union';
import keys from 'lodash/keys';

const getDiff = (dataBefore, dataAfter) => union(keys(dataBefore), keys(dataAfter)).map((key) => {
  if (dataBefore[key] instanceof Object && dataAfter[key] instanceof Object) {
    return {
      type: 'nested', key, children: getDiff(dataBefore[key], dataAfter[key]),
    };
  }
  if (dataBefore[key] === dataAfter[key]) {
    return {
      type: 'unmodified', key, currentData: dataBefore[key],
    };
  }
  if (key in dataBefore && !(key in dataAfter)) {
    return {
      type: 'removed', key, removedData: dataBefore[key],
    };
  }
  if (key in dataAfter && !(key in dataBefore)) {
    return {
      type: 'added', key, currentData: dataAfter[key],
    };
  }
  return {
    type: 'modified', key, currentData: dataAfter[key], removedData: dataBefore[key],
  };
});

export default getDiff;
