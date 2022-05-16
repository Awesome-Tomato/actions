import fs from 'node:fs';
import path from 'node:path';

export function getPackageJson(projectPath) {
  try {
    const packageJsonPath = path.resolve(projectPath, 'package.json');
    const json = fs.readFileSync(packageJsonPath).toString();
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function runBuildCommandAt(projectPath) {
  return projectPath;
}

export function moveBuildOutputIntoImplementDirectory() {}

export function getReadmeAt(projectPath) {
  const fullpath = path.resolve(projectPath, 'readme.md');
  let readme;
  try {
    readme = fs.readFileSync(fullpath).toString();
  } catch (e) {
    return {};
  }

  return { fullpath, readme };
}
