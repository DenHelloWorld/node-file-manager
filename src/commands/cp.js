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
  let destinationFilePath = resolve(directory, fileName);

  try {
    await access(destinationFilePath, constants.F_OK);
    destinationFilePath = resolve(directory, `copy_${fileName}`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      printError(error.message);
      return;
    }
  }

  printInfo(
    `Starting to copy file from ${sourceFilePath} to ${destinationFilePath}...`
  );

  return copyFileStream(sourceFilePath, destinationFilePath);
};
export default cp;
