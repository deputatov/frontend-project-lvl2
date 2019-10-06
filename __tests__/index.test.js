import genDiff from '../src';
import path from 'path';
import fs from 'fs';

const data1 = path.resolve(__dirname, '__fixtures__/before.json');
const data2 = path.resolve(__dirname, '__fixtures__/after.json');
const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/expectedJSON'), 'utf8');

test('gendiff', () => {
  expect(genDiff(data1, data2)).toBe(expected);
});
