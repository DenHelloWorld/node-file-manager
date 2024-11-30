import { rm as rmFs } from 'node:fs/promises';
import { resolve } from 'node:path';
import { printSuccess } from '../helpers/printText.js';

const rm = async (pathToFile) => {
  const resolvedPath = resolve(pathToFile);

  try {
    await rmFs(resolvedPath, { recursive: true });
    printSuccess(`File deleted: ${resolvedPath}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default rm;
