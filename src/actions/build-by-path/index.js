import { getPackageJson, runBuildCommandAt } from '../../libs/projectExplorer';
import * as core from '@actions/core';

run(JSON.parse(core.getInput('fullpaths')));

export function run(fullpaths) {
  const buildPath = (fullpath) => {
    const packageJson = getPackageJson(fullpath);
    if (!packageJson) {
      console.log('package.json Not found. exit.');
      return;
    }

    runBuildCommandAt(fullpath);
  };

  fullpaths.forEach((fullpath) => {
    core.startGroup(`Build ${fullpath}`);
    buildPath(fullpath);
    core.endGroup();
  });
}
