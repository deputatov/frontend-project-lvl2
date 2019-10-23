import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getDiff from './diff';
import render from './formatters';

const parseFile = (filepath) => {
  const fileData = fs.readFileSync(filepath, 'utf8');
  const type = path.extname(filepath).slice(1);
  return parse(type, fileData);
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const dataBefore = parseFile(pathToFile1);
  const dataAfter = parseFile(pathToFile2);
  return render(getDiff(dataBefore, dataAfter), format);
};

export default genDiff;
