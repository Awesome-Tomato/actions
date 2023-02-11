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
  childProcess.execSync(`npm --prefix="${projectPath}" ci`, { stdio: 'inherit' });
  childProcess.execSync(`npm --prefix="${projectPath}" run build`, { stdio: 'inherit' });
  
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
    `mv -v ${path.resolve(projectPath, buildDirectory, '*')} ${projectPath}`,
    { stdio: 'inherit' },
  );
}

export function getReadmeAt(projectPath) {
  const contents = fs.readdirSync(projectPath);
  const readmeIndex = contents
    .map(p => p.toLowerCase())
    .findIndex(p => p === 'readme.md');
  if(readmeIndex === -1) {
    console.log('Failed to find README.md file: ', projectPath);
    return {};
  }
  
  const fullpath = path.resolve(projectPath, contents[readmeIndex]);
  try {
    return {
      readme: fs.readFileSync(fullpath).toString(),
      fullpath
    };
  } catch (e) {
    console.log('Got an error while reading readme');
    console.warn(e);
    return {};
  }
}
