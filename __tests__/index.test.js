import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index';
import { readFile } from '../src/tools';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);

test('genDiff - compare JSON files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile(getFixturePath('expected_file1.txt')));
});

test('genDiff - compare YML files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFile(getFixturePath('expected_file1.txt')));
});
