import { createReadStream, createWriteStream } from 'node:fs';
import { access, mkdir, stat } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { printInfo, printSuccess } from '../helpers/printText.js';

const compress = async (pathToFile, destination) => {
  try {
    const fullPathToFile = path.resolve(process.cwd(), pathToFile);

    const fileStat = await stat(fullPathToFile);
    if (!fileStat.isFile()) {
      throw new Error('It is not a valid file on this path');
    }

    const fullPathToDestination = path.resolve(process.cwd(), destination);

    const isDirectory = (await stat(fullPathToDestination)).isDirectory();
    let destinationFile;

    if (isDirectory) {
      const originalFileName = path.basename(fullPathToFile);
      destinationFile = path.join(
        fullPathToDestination,
        `${originalFileName}.br`
      );
    } else {
      destinationFile = fullPathToDestination;
    }

    const directory = path.dirname(destinationFile);
    try {
      await access(directory);
    } catch {
      await mkdir(directory, { recursive: true });
    }

    printInfo('Compressing...');

    const brotli = createBrotliCompress();
    const source = createReadStream(fullPathToFile);
    const destinationStream = createWriteStream(destinationFile);

    await pipeline(source, brotli, destinationStream);

    printSuccess(`File successfully compressed to ${destinationFile}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default compress;
