import fs from 'node:fs';
import path from 'node:path';

/**
 *
 * @param {string} absolutePath absolute path for read directories
 * @returns {string[]} sub-directory's absolute paths
 */
export function readDirectoriesAsFullPath(absolutePath) {
  const resolveToAbsolutePath = (p) => path.resolve(absolutePath, p);
  const contents = fs.readdirSync(absolutePath);
  return contents
    .filter((name) => pathIsDirectory(resolveToAbsolutePath(name)))
    .map(resolveToAbsolutePath);
}

/**
 *
 * @param {string} absolutePath
 * @returns {boolean}
 */
export function pathIsDirectory(absolutePath) {
  try {
    return fs.lstatSync(absolutePath).isDirectory();
  } catch (e) {
    return false;
  }
}

/**
 *
 * @param {string} absolutePath
 */
export function createDirectory(absolutePath) {
  try {
    fs.mkdirSync(absolutePath);
  } catch (e) {}
}

export function writeFile(fullpath, str) {
  fs.writeFileSync(fullpath, str);
}
