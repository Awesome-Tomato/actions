import {
  getPackageJson,
  moveBuildOutputIntoImplementDirectory,
} from '../../libs/projectExplorer';
import * as core from '@actions/core';

run(JSON.parse(core.getInput('fullpaths')));

function run(fullpaths) {
  const moveBuildOutput = (fullpath) => {
    const packageJson = getPackageJson(fullpath);
    if (!packageJson) {
      console.log('package.json not found. exit.');
      return;
    }

    moveBuildOutputIntoImplementDirectory(fullpath);
  };

  fullpaths.forEach((fullpath) => {
    core.startGroup(`Move output as parent directory. target: ${fullpath}`);
    moveBuildOutput(fullpath);
    core.endGroup();
  });
}
