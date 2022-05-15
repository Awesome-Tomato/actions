import fs from 'node:fs';
import path from 'node:path';
import { readDirectoriesAsFullPath } from './fileSystem';

test(`Test 'readDirectoriesAsFullPath' function`, () => {
  const TEST_WORKDIR = 'fileSystemTest';
  const currentPath = (p) => path.resolve(__dirname, TEST_WORKDIR, p);
  fs.mkdir(currentPath('./'));

  const directories = ['a', 'b.c', 'c.txt', '.github'];
  directories.forEach((dir) => fs.mkdir(currentPath(dir)));

  const files = ['ab', 'b', 'temp.txt', '.gitignore'];
  files.forEach((file) => fs.writeFileSync(currentPath(file)));

  const resultOfTargetFunction = readDirectoriesAsFullPath(currentPath('./'));
  expect(resultOfTargetFunction).toEqual(directories);

  // cleanup
  fs.rmdirSync(currentPath('./'));
});
