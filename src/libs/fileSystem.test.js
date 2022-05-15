import fs from 'node:fs';
import path from 'node:path';
import { createDirectory, readDirectoriesAsFullPath } from './fileSystem';

test(`Test 'readDirectoriesAsFullPath' function`, async () => {
  const TEST_WORKDIR = 'fileSystemTest';
  const currentPath = (p) => path.resolve(__dirname, TEST_WORKDIR, p);
  createDirectory(currentPath('./'));

  const directories = ['a', 'b.c', 'c.txt', '.github'];
  directories.forEach((dir) => createDirectory(currentPath(dir)));

  const files = ['ab', 'b', 'temp.txt', '.gitignore'];
  files.forEach((file) => fs.writeFileSync(currentPath(file), ''));

  const resultOfTargetFunction = readDirectoriesAsFullPath(currentPath('./'));
  const expectDirectories = directories.map(currentPath);
  // 순서에 따라 다른 결과가 나오므로, 정렬이 필요합니다
  expect(resultOfTargetFunction.sort()).toEqual(expectDirectories.sort());

  // cleanup
  fs.rmdirSync(currentPath('./'), { recursive: true });
});
