import { resolve, basename } from 'node:path';
import { printInfo, printError, printSuccess } from '../helpers/printText.js';
import { access, constants } from 'fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import handleStreamError from '../helpers/handleStreamError.js';

const copyFileStream = (source, destination) => {
  return new Promise((res, reject) => {
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);

    handleStreamError(readStream, reject);
    handleStreamError(writeStream, reject);

    writeStream.on('finish', () => {
      printSuccess(`File copied from ${source} to ${destination}`);
      res();
    });

    readStream.pipe(writeStream);
  });
};

const cp = async (path, directory) => {
  const sourceFilePath = resolve(path);
  const fileName = basename(sourceFilePath);
  const destinationFilePath = resolve(directory, fileName);

  try {
    printInfo(
      `Starting to copy file from ${sourceFilePath} to ${destinationFilePath}...`
    );

    await access(destinationFilePath, constants.F_OK);

    throw new Error(
      `File already exists at ${destinationFilePath}. Copying aborted.`
    );
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(`Error checking file existence: ${error.message}`);
    }

    await copyFileStream(sourceFilePath, destinationFilePath);

    printInfo(`File successfully copied to ${destinationFilePath}`);
  }
};
export default cp;
