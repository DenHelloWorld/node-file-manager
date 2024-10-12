import path from 'node:path';
import { cwd } from 'node:process';
import { printError, printText } from '../helpers/printText.js';
import { readFile } from 'fs/promises';

const cat = async (filePath) => {
  const fullPath = path.resolve(cwd(), filePath);

  try {
    const data = await readFile(fullPath, { encoding: 'utf8' });

    printText(data);
  } catch (error) {
    printError(`Error reading from file: ${error.message}`);
  }
};

export default cat;
