import { createReadStream, createWriteStream } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { printInfo, printSuccess } from '../helpers/printText.js';

const compress = async (pathToFile, destination) => {
  try {
    const fullPathToFile = path.resolve(pathToFile);
    const originalFileName = path.basename(
      fullPathToFile,
      path.extname(fullPathToFile)
    );
    const fullDestination = path.extname(destination)
      ? path.resolve(destination)
      : path.resolve(destination, `${originalFileName}.br`);

    const directory = path.dirname(fullDestination);

    try {
      await access(directory);
    } catch {
      await mkdir(directory, { recursive: true });
    }
    const brotli = createBrotliCompress();
    const source = createReadStream(fullPathToFile);
    const destinationStream = createWriteStream(fullDestination);

    printInfo('Compressing...');
    await pipeline(source, brotli, destinationStream);

    printSuccess(`File successfully compressed to ${fullDestination}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default compress;
