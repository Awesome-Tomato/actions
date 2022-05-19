import { getReadmeAt } from '../../libs/projectExplorer';
import core from '@actions/core';
import { readDirectoriesAsFullPath } from '../../libs/fileSystem';

run();

export function run() {
  const root = path.resolve(__dirname, './');
  const subDirectoryPaths = readDirectoriesAsFullPath(root);

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
