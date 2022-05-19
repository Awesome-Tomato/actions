import path from 'node:path';
import { getReadmeAt } from '../../libs/projectExplorer';
import * as core from '@actions/core';
import { readDirectoriesAsFullPath } from '../../libs/fileSystem';

run();

export function run() {
  const root = path.resolve(__dirname, './');
  console.log(`Root: ${root}\n`);
  const subDirectoryPaths = readDirectoriesAsFullPath(root);
  console.log(`Sub-directories: \n${subDirectoryPaths.join('\n')}\n`);

  const validMissionPaths = subDirectoryPaths.filter((projectPath) => {
    const { fullpath } = getReadmeAt(projectPath);
    return Boolean(fullpath);
  });

  const projectPaths = [];
  validMissionPaths.forEach((path) =>
    projectPaths.push(...readDirectoriesAsFullPath(path))
  );

  console.log(`Loaded projectPaths are \n${projectPaths.join('\n')}\n`);
  core.setOutput('projectPaths', projectPaths);
}
