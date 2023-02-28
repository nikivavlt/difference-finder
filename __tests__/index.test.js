import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import { readFile } from '../src/tools.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);

const cases = [
  {
    filePath1: 'file1.json', filePath2: 'file2.json', outputFilePath: 'expected_stylish.txt', format: 'stylish', type: 'json',
  },
  {
    filePath1: 'file1.json', filePath2: 'file2.json', outputFilePath: 'expected_plain.txt', format: 'plain', type: 'json',
  },
  {
    filePath1: 'file1.json', filePath2: 'file2.json', outputFilePath: 'expected_json.txt', format: 'json', type: 'json',
  },
  {
    filePath1: 'file1.yml', filePath2: 'file2.yml', outputFilePath: 'expected_stylish.txt', format: 'stylish', type: 'yml',
  },
  {
    filePath1: 'file1.yml', filePath2: 'file2.yml', outputFilePath: 'expected_plain.txt', format: 'plain', type: 'yml',
  },
  {
    filePath1: 'file1.yml', filePath2: 'file2.yml', outputFilePath: 'expected_json.txt', format: 'json', type: 'yml',
  },
];

test.each(cases)(
  'genDiff - compare .$type files (Format: $format)',
  ({
    filePath1, filePath2, outputFilePath, format,
  }) => {
    const file1 = getFixturePath(filePath1);
    const file2 = getFixturePath(filePath2);
    const expectedFile = readFile(getFixturePath(outputFilePath));

    const result = genDiff(file1, file2, format);
    expect(result).toEqual(expectedFile);
  },
);
