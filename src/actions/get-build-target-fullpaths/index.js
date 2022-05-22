import { getReadmeAt } from '../../libs/projectExplorer';
import * as core from '@actions/core';
import { readDirectoriesAsFullPath } from '../../libs/fileSystem';

run(core.getInput('workspace'));

export function run(workspace) {
  console.log(`Test read context.. ${core.getInput('github')}`);
  console.log(core.getInput('github').workspace);

  console.log(`Root: ${workspace}\n`);
  const subDirectoryPaths = readDirectoriesAsFullPath(workspace);
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
  core.setOutput('projectPaths', JSON.stringify(projectPaths));
}
