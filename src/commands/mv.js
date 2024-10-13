import { resolve, basename } from 'node:path';
import cp from './cp.js';
import rm from './rm.js';
import { printSuccess } from '../helpers/printText.js';

const mv = async (path, directory) => {
  const sourceFilePath = resolve(path);
  const fileName = basename(sourceFilePath);
  const destinationFilePath = resolve(directory, fileName);

  try {
    await cp(path, directory);
    await rm(sourceFilePath);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default mv;
