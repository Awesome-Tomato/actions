import path from 'node:path';
import {
  pathIsDirectory,
  readDirectoriesAsFullPath,
  writeFile,
} from './libs/fileSystem';
import {
  getPackageJson,
  getReadmeAt,
  moveBuildOutputIntoImplementDirectory,
  runBuildCommandAt,
} from './libs/projectExplorer';

run();

function run() {
  const root = path.resolve(__dirname, './');
  const projectPaths = readDirectoriesAsFullPath(root).filter(pathIsDirectory);

  // TODO: 각 프로젝트 구현폴더를 돌때 실행하는 코드 별도 함수로 분리하기
  // TODO: 리팩토링이 꼭 필요함 - 배포해야하는지 확인하는 부분이 정리가 필요함
  projectPaths.forEach((projectPath) => {
    const { readme, fullpath: readmePath } = getReadmeAt(projectPath);
    if (!readmePath) return;

    const projectImplements = readDirectoriesAsFullPath(projectPath);
    const implementItems = projectImplements.map((fullpath) => ({
      fullpath,
      packageJson: getPackageJson(fullpath),
    }));

    implementItems
      .filter((implement) => implement.packageJson)
      .map((implement) => {
        runBuildCommandAt(implement.fullpath);
        return implement;
      })
      .filter((implement) => implement.packageJson.deploy !== false)
      .forEach((implement) =>
        moveBuildOutputIntoImplementDirectory(implement.fullpath)
      );

    const implementDirectoryNames = implementItems
      .filter(({ packageJson }) => packageJson?.deploy !== false)
      .map((implement) => path.basename(implement.fullpath));
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
