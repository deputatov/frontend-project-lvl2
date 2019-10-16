import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const expectedFlat = fs.readFileSync(path.resolve(__dirname, '__fixtures__/flat/expected'), 'utf8');
const expectedRecursive = fs.readFileSync(path.resolve(__dirname, '__fixtures__/recursive/expected'), 'utf8');
const expectedPlain = fs.readFileSync(path.resolve(__dirname, '__fixtures__/recursive/expectedplain'), 'utf8');

const getDataFlat = (name, extension) => path.resolve(__dirname, `__fixtures__/flat/${name}${extension}`);
const getDataRecursive = (name, extension) => path.resolve(__dirname, `__fixtures__/recursive/${name}${extension}`);

test.each(['.json', '.yml', '.ini'])(
  'gendiff pretty flat files %s',
  (extension) => {
    expect(genDiff(getDataFlat('before', extension),
      getDataFlat('after', extension), 'pretty')).toBe(expectedFlat);
  },
);

test.each(['.json', '.yml', '.ini'])(
  'gendiff pretty recursive files %s',
  (extension) => {
    expect(genDiff(getDataRecursive('before', extension),
      getDataRecursive('after', extension), 'pretty')).toBe(expectedRecursive);
  },
);

test.each(['.json', '.yml', '.ini'])(
  'gendiff plain recursive files %s',
  (extension) => {
    expect(genDiff(getDataRecursive('before', extension),
      getDataRecursive('after', extension), 'plain')).toBe(expectedPlain);
  },
);
