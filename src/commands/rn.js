import { resolve } from 'node:path';
import { rename } from 'fs/promises';
import { printSuccess } from '../helpers/printText.js';

const rn = async (path, newFilename) => {
  const pathResolwed = resolve(path);
  const newFilenameResolved = resolve(newFilename);

  try {
    await rename(pathResolwed, newFilenameResolved);
    printSuccess(`File renamed from ${path} to ${newFilename}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default rn;
