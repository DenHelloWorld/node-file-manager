import path from 'node:path';
import { cwd } from 'node:process';
import { writeFile } from 'node:fs/promises';
import { printSuccess } from '../helpers/printText.js';

const add = async (newFileName) => {
  const fullPath = path.resolve(cwd(), newFileName);

  try {
    await writeFile(fullPath, Buffer.alloc(0));
    printSuccess(`${newFileName} was created in ${fullPath}`);
  } catch (error) {
    throw new Error(error);
  }
};
export default add;
