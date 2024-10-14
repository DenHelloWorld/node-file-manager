import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { printInfo, printSuccess } from '../helpers/printText.js';

const compress = async (pathToFile, destination) => {
  try {
    const fullPathToFile = path.resolve(pathToFile);
    const fullDestination = path.extname(destination)
      ? path.resolve(destination)
      : path.resolve(`${destination}.br`);
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
