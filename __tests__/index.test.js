import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index';
import { readFile } from '../src/tools';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);

test('genDiff - compare .json files (Format: Stylish)', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile(getFixturePath('expected_stylish')));
});

test('genDiff - compare .yml files (Format: Stylish)', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFile(getFixturePath('expected_stylish')));
});

test('genDiff - compare .json files (Format: Plain)', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile(getFixturePath('expected_plain')));
});

test('genDiff - compare .yml files (Format: Plain)', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile(getFixturePath('expected_plain')));
});

test('genDiff - compare .json files (Format: JSON)', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFile(getFixturePath('expected_json')));
});

test('genDiff - compare .yml files (Format: JSON)', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(readFile(getFixturePath('expected_json')));
});
