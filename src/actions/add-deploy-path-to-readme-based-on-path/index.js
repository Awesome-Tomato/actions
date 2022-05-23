import * as core from '@actions/core';
import { getPackageJson, getReadmeAt } from '../../libs/projectExplorer';
import path from 'node:path';
import { writeFile } from '../../libs/fileSystem';

run(JSON.parse(core.getInput('fullpaths')), core.getInput('projectBaseUrl'));

// 함수를 좀 더 잘게 쪼개는 리팩토링이 필요함
// 스크립팅 느낌이 강하다
function run(fullpaths, PROJECT_BASE_URL) {
  console.log(`Deploy URL's base will ${PROJECT_BASE_URL}`);
  const projectPaths = fullpaths
    .map((fullpath) => path.resolve(fullpath, '../'))
    .filter((fullpath, index, paths) => paths.indexOf(fullpath) === index);

  projectPaths.forEach((projectPath) => {
    core.startGroup(projectPath);
    const implementPaths = fullpaths.filter((implementPath) =>
      implementPath.include(projectPath)
    );
    updateReadme(projectPath, implementPaths, PROJECT_BASE_URL);
    core.endGroup();
  });
}

function updateReadme(projectPath, implementPaths, PROJECT_BASE_URL) {
  const implementDirectoryNames = implementPaths
    .filter((fullpath) => {
      const packageJson = getPackageJson(fullpath);
      if (!packageJson) return true;
      return packageJson.deploy !== false;
    })
    .map((fullpath) => path.basename(fullpath));

  console.log(`\nWrite those implements : \n`);
  console.log(implementDirectoryNames.join('\n') + '\n');

  const projectName = path.basename(projectPath);
  const nameToItem = (name) =>
    `- [${name}](${PROJECT_BASE_URL}/${projectName}/${name}/index.html)`;
  const deployList =
    '\n' + implementDirectoryNames.map(nameToItem).join('\n') + '\n\n';

  const deployListSelectRegex =
    /(?<=## 배포링크(\n|\r\n))(\n|\r\n)((- .+(\n|\r\n))*)/;
  const { readme, fullpath: readmePath } = getReadmeAt(projectPath);
  console.log(`\nReadme: ${readme}\n\n`);
  writeFile(readmePath, readme.replace(deployListSelectRegex, deployList));
}
