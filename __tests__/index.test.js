import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const expectedFlat = fs.readFileSync(path.resolve(__dirname, '__fixtures__/flat/expected'), 'utf8');
const expectedRecursive = fs.readFileSync(path.resolve(__dirname, '__fixtures__/recursive/expected'), 'utf8');

const getDataFlat = (name, extension) => path.resolve(__dirname, `__fixtures__/flat/${name}${extension}`);
const getDataRecursive = (name, extension) => path.resolve(__dirname, `__fixtures__/recursive/${name}${extension}`);

test.each(['.json', '.yml', '.ini'])(
  'gendiff flat files %s',
  (extension) => {
    expect(genDiff(getDataFlat('before', extension), getDataFlat('after', extension))).toBe(expectedFlat);
  },
);

test.each(['.json', '.yml', '.ini'])(
  'gendiff recursive files %s',
  (extension) => {
    expect(genDiff(getDataRecursive('before', extension), getDataRecursive('after', extension))).toBe(expectedRecursive);
  },
);
