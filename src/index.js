import path from 'node:path';

run();

function run() {
  const root = path.resolve(__dirname, './');
  const projectPaths = readDirectoriesAsFullPath(root).filter(isDir);

  projectPaths.forEach((projectPath) => {
    const projectImplements = readDirectoriesAsFullPath(projectPath);
    projectImplements
      .filter(hasPackageJson)
      .map(runBuildCommandAt)
      .forEach(moveBuildOutputAsImplementDirectory);
  });
}
