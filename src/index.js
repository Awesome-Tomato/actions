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
  projectPaths.forEach(buildThenDeployAllImplement);
}

function buildThenDeployAllImplement(projectPath) {
  const { readme, fullpath: readmePath } = getReadmeAt(projectPath);
  if (!readmePath) return;

  // 프로젝트를 구현한 서브 디렉토리 패스와 package.json을 가져온다
  const projectImplementPaths = readDirectoriesAsFullPath(projectPath);
  const implementItems = projectImplementPaths.map((fullpath) => ({
    fullpath,
    packageJson: getPackageJson(fullpath),
  }));

  // package.json 이 있는 서브 디렉토리를 빌드하고
  // 결과물 폴더를 옮긴다
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

  // 배포링크 생성 및 readme 에 적용
  const implementDirectoryNames = implementItems
    .filter(({ packageJson }) => packageJson?.deploy !== false)
    .map((implement) => path.basename(implement.fullpath));
  const projectName = path.basename(projectPath);
  const PROJECT_BASE_URL = `https://awesome-tomato.github.io/CodeReview/${projectName}`;
  const deployList =
    '\n' +
    implementDirectoryNames
      .map((name) => `- [${name}](${PROJECT_BASE_URL}/${name}/index.html)`)
      .join('\n') +
    '\n\n';

  const deployListSelectRegex =
    /(?<=## 배포링크(\n|\r\n))(\n|\r\n)((- .+(\n|\r\n))*)/;
  writeFile(readmePath, readme.replace(deployListSelectRegex, deployList));
}
