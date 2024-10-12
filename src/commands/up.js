import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { stat } from 'fs/promises';
import { printError } from '../helpers/printText.js';

const up = async () => {
  try {
    const currentDir = cwd();
    const parentDir = resolve(currentDir, '..');

    const currentStats = await stat(currentDir);
    const parentStats = await stat(parentDir);

    if (parentStats.ino !== currentStats.ino) {
      process.chdir(parentDir);
    } else {
      throw new Error('You are already in the root');
    }
  } catch (error) {
    printError(error);
  }
};
export default up;
