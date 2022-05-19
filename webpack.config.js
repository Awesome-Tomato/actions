const path = require('node:path');

const ACTIONS = {
  GET_BUILD_TARGET_FULLPATHS: 'get-build-target-fullpaths',
  ADD_DEPLOY_PATH_TO_README: 'add-deploy-path-to-readme-based-on-path',
  MOVE_BUILD_OUTPUT: 'move-build-output-to-parent-directory',
  BUILD_BY_PATH: 'build-by-path',
};
const getActionSrc = (action) => resolve(`src/actions/${action}/index.js`);

module.exports = {
  entry: {
    // [경로/파일명]: 번들링할 파일 위치
    [ACTIONS.ADD_DEPLOY_PATH_TO_README]: getActionSrc(
      ACTIONS.ADD_DEPLOY_PATH_TO_README
    ),
    [ACTIONS.GET_BUILD_TARGET_FULLPATHS]: getActionSrc(
      ACTIONS.GET_BUILD_TARGET_FULLPATHS
    ),
    [ACTIONS.MOVE_BUILD_OUTPUT]: getActionSrc(ACTIONS.MOVE_BUILD_OUTPUT),
    [ACTIONS.BUILD_BY_PATH]: getActionSrc(ACTIONS.BUILD_BY_PATH),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    clean: true,
  },

  target: 'node',
  devtool: 'inline-source-map',
};

function resolve(...paths) {
  return path.resolve(__dirname, ...paths);
}
