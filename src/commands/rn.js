import path from 'node:path';
import { rename, stat } from 'node:fs/promises';
import { printSuccess } from '../helpers/printText.js';

const rn = async (pathToFile, newFileName) => {
  try {
    const absolutePath = path.resolve(pathToFile);
    await stat(absolutePath);
    const directory = path.dirname(absolutePath);
    const newPath = path.join(directory, newFileName);
    await rename(absolutePath, newPath);
    printSuccess(`File renamed to ${newFileName}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default rn;
