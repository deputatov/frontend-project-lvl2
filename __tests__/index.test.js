import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const expected = (format) => fs.readFileSync(path.resolve(__dirname, `__fixtures__/expected${format}`), 'utf8');
const getPath = (name, extension) => path.resolve(__dirname, `__fixtures__/${name}${extension}`);

test.each(['.json', '.yml', '.ini'])(
  'gendiff %s',
  (extension) => {
    expect(genDiff(getPath('before', extension), getPath('after', extension), 'pretty')).toBe(expected('pretty'));
    expect(genDiff(getPath('before', extension), getPath('after', extension), 'plain')).toBe(expected('plain'));
    expect(genDiff(getPath('before', extension), getPath('after', extension), 'json')).toBe(expected('json'));
  },
);
