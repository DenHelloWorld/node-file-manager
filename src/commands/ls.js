import { readdir } from 'fs/promises';
import { cwd } from 'node:process';

const ls = async () => {
  try {
    const currentDir = cwd();
    const data = await readdir(currentDir, { withFileTypes: true });

    const directories = data
      .filter((file) => file.isDirectory())
      .map((dir) => ({ name: dir.name, type: 'directory' }));

    const regularFiles = data
      .filter((file) => file.isFile())
      .map((file) => ({ name: file.name, type: 'file' }));

    const tableData = [...directories, ...regularFiles];

    console.table(tableData);
  } catch {
    throw new Error();
  }
};
export default ls;
