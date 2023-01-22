import genDiff from '../src/index.js';

test('genDiff', () => {
  expect(genDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json")).toEqual('test');
});
