import fs from 'node:fs';

/**
 *
 * @param {string} path
 * @returns {string[]} sub-directory's absolute paths
 */
export function readDirectoriesAsFullPath(path) {
  return fs.readFileSync(path);
}
