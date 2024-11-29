import path from 'node:path';
import { cwd } from 'node:process';
import { access, writeFile, constants } from 'node:fs/promises';
import { printSuccess } from '../helpers/printText.js';

const add = async (newFileName) => {
  const fullPath = path.resolve(cwd(), newFileName);

  try {
    await access(fullPath, constants.F_OK);
    throw new Error(`A file ${newFileName} already exists in this directory`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(fullPath, Buffer.alloc(0));
      printSuccess(`${newFileName} was created in ${fullPath}`);
    } else {
      throw error;
    }
  }
};
export default add;
