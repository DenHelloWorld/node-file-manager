import { resolve } from 'node:path';
import { stat } from 'fs/promises';
import { cwd } from 'node:process';

const cd = async (pathToDirectory) => {
  const fullPath = resolve(cwd(), pathToDirectory);

  const stats = await stat(fullPath);
  if (!stats.isDirectory()) {
    throw new Error();
  }

  process.chdir(fullPath);
};
export default cd;
