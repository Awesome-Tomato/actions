import { runBuildCommandAt } from '../../libs/projectExplorer';
import * as core from '@actions/core';

run(core.getInput('fullpaths'));

export function run(fullpaths) {
  fullpaths.forEach(runBuildCommandAt);
}
