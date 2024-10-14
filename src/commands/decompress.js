import path from 'node:path';
import { access, mkdir } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { printInfo, printSuccess } from '../helpers/printText.js';
import { pipeline } from 'node:stream/promises';

const decompress = async (pathToFile, destination) => {
  try {
    const fullPathToFile = path.resolve(pathToFile);
    const originalFileName = path.basename(fullPathToFile, '.br');

    const fullDestination = path.extname(destination)
      ? path.resolve(destination)
      : path.resolve(destination, originalFileName);

    const directory = path.dirname(fullDestination);

    try {
      await access(directory);
    } catch {
      await mkdir(directory, { recursive: true });
    }

    const source = createReadStream(fullPathToFile);
    const destinationStream = createWriteStream(fullDestination);
    const brotli = createBrotliDecompress();

    printInfo('Decompressing...');
    await pipeline(source, brotli, destinationStream);

    printSuccess(`File successfully decompressed to ${fullDestination}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
export default decompress;
