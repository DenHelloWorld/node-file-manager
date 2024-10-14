import { stat } from 'fs/promises';
import { printError } from '../helpers/printText.js';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

const up = async () => {
  const currentDir = cwd();
  const parentDir = resolve(currentDir, '..');

  const currentStats = await stat(currentDir);
  const parentStats = await stat(parentDir);

  if (parentStats.ino !== currentStats.ino) {
    process.chdir(parentDir);
  } else {
    throw new Error('You are in the root directory');
  }
};
export default up;
