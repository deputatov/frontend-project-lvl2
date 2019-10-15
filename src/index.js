import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import diff from './diff';
import render from './render';

const parseFile = (filepath) => {
  const fileData = fs.readFileSync(path.resolve(filepath), 'utf8', (err, data) => {
    if (err) throw err;
    return data;
  });
  const extension = path.extname(filepath);
  return parsers(extension)(fileData);
};

const genDiff = (pathToFile1, pathToFile2) => {
  const dataBefore = parseFile(pathToFile1);
  const dataAfter = parseFile(pathToFile2);
  return render(diff(dataBefore, dataAfter));
};

export default genDiff;
