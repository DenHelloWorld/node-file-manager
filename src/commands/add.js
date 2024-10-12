import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { writeFile } from 'fs/promises';
import { printSuccess } from '../helpers/printText.js';

const add = async (fileName) => {
  const fullPath = resolve(cwd(), fileName);

  try {
    await writeFile(fullPath, '');
    printSuccess(`Successfully created empty file: ${fullPath}`);
  } catch {
    throw new Error();
  }
};
export default add;
