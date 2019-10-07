import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/expected'), 'utf8');

const getData = (name, extension) => path.resolve(__dirname, `__fixtures__/${name}.${extension}`);

test.each(['json', 'yml', 'ini'])(
  'gendiff %s',
  (extension) => {
    expect(genDiff(getData('before', extension), getData('after', extension))).toBe(expected);
  },
);
