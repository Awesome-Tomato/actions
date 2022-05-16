import path from 'node:path';
import {
  pathIsDirectory,
  readDirectoriesAsFullPath,
  writeFile,
} from './libs/fileSystem';
import {
  getReadmeAt,
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
    const { readme, fullpath: readmePath } = getReadmeAt(projectPath);
    if (!readmePath) return;

    const projectImplements = readDirectoriesAsFullPath(projectPath);
    projectImplements
      .filter(hasPackageJson)
      .map(runBuildCommandAt)
      .forEach(moveBuildOutputIntoImplementDirectory);

    const implementDirectoryNames = projectImplements.map((fullpath) =>
      path.basename(fullpath)
    );
    const projectName = path.basename(projectPath);
    const PROJECT_BASE_URL = `https://awesome-tomato.github.io/CodeReview/${projectName}/`;
    const deployList =
      implementDirectoryNames
        .map((name) => `- [${name}](${PROJECT_BASE_URL}/${name}/index.html)`)
        .join('\n') + '\n';

    console.log(implementDirectoryNames);
    const deployListSelectRegex = /(?<=## 배포링크\n\n)((- [^\n]+\n)*)/;
    writeFile(readmePath, readme.replace(deployListSelectRegex, deployList));
  });
}
