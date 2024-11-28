import { resolve } from 'node:path';
import { rename, access, constants } from 'fs/promises';
import { printSuccess } from '../helpers/printText.js';

const rn = async (path, newFileName) => {
  const pathResolwed = resolve(path);
  const newFilenameResolved = resolve(newFileName);

  try {
    await access(newFilenameResolved, constants.F_OK);
    throw new Error(`A file ${newFileName} already exists in this directory`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await rename(pathResolwed, newFilenameResolved);
      printSuccess(`File renamed from ${path} to ${newFileName}`);
    } else {
      throw error;
    }
  }
};
export default rn;
