import { runBuildCommandAt } from '../../libs/projectExplorer';
import core from '@actions/core';

run(core.getInput('fullpaths'));

export function run(fullpaths) {
  fullpaths.forEach(runBuildCommandAt);
}
