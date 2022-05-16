import path from 'node:path';
import { pathIsDirectory, readDirectoriesAsFullPath } from './libs/fileSystem';
import {
  hasPackageJson,
  moveBuildOutputIntoImplementDirectory,
  runBuildCommandAt,
} from './libs/projectExplorer';

run();

function run() {
  const root = path.resolve(__dirname, './');
  const projectPaths = readDirectoriesAsFullPath(root).filter(pathIsDirectory);

  // TODO: 각 프로젝트 구현폴더를 돌때 실행하는 코드 별도 함수로 분리하기
  projectPaths.forEach((projectPath) => {
    const projectImplements = readDirectoriesAsFullPath(projectPath);
    projectImplements
      .filter(hasPackageJson)
      .map(runBuildCommandAt)
      .forEach(moveBuildOutputIntoImplementDirectory);
  });
}
