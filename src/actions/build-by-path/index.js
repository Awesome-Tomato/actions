import { getPackageJson, runBuildCommandAt } from '../../libs/projectExplorer';
import * as core from '@actions/core';
import YAML from 'yaml';

run(
  JSON.parse(core.getInput('fullpaths')),
  YAML.parse(core.getInput('build-env-yaml')),
);

export function run(fullpaths, env = {}) {
  fullpaths.forEach((fullpath) => {
    core.startGroup(`Build ${fullpath}`);

    const packageJson = getPackageJson(fullpath);
    if (!packageJson) {
      console.log('package.json Not found. exit.');
      core.endGroup();
      return;
    }

    console.log(`Received envs: ${Object.keys(env).join(', ')}`);

    runBuildCommandAt(fullpath, env);
    core.endGroup();
  });
}
