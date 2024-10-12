import { readdir } from 'fs/promises';
import { cwd } from 'node:process';

const ls = async () => {
  try {
    const currentDir = cwd();
    const files = await readdir(currentDir, { withFileTypes: true });

    const tabularData = files.map((file) => ({
      name: file.name,
      type: file.isDirectory() ? 'directory' : 'file',
    }));

    console.table(tabularData);
  } catch {
    throw new Error();
  }
};
export default ls;
