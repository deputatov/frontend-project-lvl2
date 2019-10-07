import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/expected'), 'utf8');

const data1JSON = path.resolve(__dirname, '__fixtures__/before.json');
const data2JSON = path.resolve(__dirname, '__fixtures__/after.json');

const data1YML = path.resolve(__dirname, '__fixtures__/before.yml');
const data2YML = path.resolve(__dirname, '__fixtures__/after.yml');

test('gendiff JSON', () => {
  expect(genDiff(data1JSON, data2JSON)).toBe(expected);
});

test('gendiff YML', () => {
  expect(genDiff(data1YML, data2YML)).toBe(expected);
});
