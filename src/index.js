import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const fileData = fs.readFileSync(path.resolve(filepath), (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(fileData);
};

const generateDifference = (pathToFile1, pathToFile2) => {
  const data1 = parseFile(pathToFile1);
  const data2 = parseFile(pathToFile2);

  const dataKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])];

  return `{\n${dataKeys
    .map((key) => {
      if (data1[key] === data2[key]) return `    ${key}: ${data1[key]}`;
      if (key in data1 && !(key in data2)) return `  - ${key}: ${data1[key]}`;
      if (key in data2 && !(key in data1)) return `  + ${key}: ${data2[key]}`;
      return `  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}`;
    }).join('\n')}\n}`;
};

export default generateDifference;
