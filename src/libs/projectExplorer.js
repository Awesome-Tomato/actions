import fs from 'node:fs';
import path from 'node:path';
import childProcess from 'node:child_process';

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
  let output = childProcess.execSync(`npm --prefix="${projectPath}" ci`);
  console.log(output.toString());

  output = childProcess.execSync(`npm --prefix="${projectPath}" run build`);
  console.log(output.toString());
  return projectPath;
}

export function moveBuildOutputIntoImplementDirectory(projectPath) {
  const possibleBuildDirectory = ['build', '.next', 'dist'];
  const subDirectories = fs.readdirSync(projectPath);

  const buildDirectory = subDirectories.find((dir) =>
    possibleBuildDirectory.includes(dir)
  );
  if (!buildDirectory) {
    console.log('Build directory not found. exit.');
    return;
  }

  childProcess.execSync(
    `mv ${path.resolve(projectPath, buildDirectory, '*')} ${projectPath}`
  );
}

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
