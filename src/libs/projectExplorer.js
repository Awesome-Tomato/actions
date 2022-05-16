import fs from 'node:fs';
import path from 'node:path';

export function hasPackageJson(projectPath) {
  try {
    fs.readFileSync(path.resolve(projectPath, 'package.json'));
    return true;
  } catch (e) {
    return false;
  }
}

export function runBuildCommandAt(projectPath) {
  return projectPath;
}

export function moveBuildOutputIntoImplementDirectory() {}

export function getReadmeAt() {}
