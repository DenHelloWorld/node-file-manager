import { printError, printText } from '../helpers/printText.js';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream';
import { cwd } from 'node:process';
import handleStreamError from '../helpers/handleStreamError.js';

const cat = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(cwd(), filePath);
    const readStream = createReadStream(fullPath, { encoding: 'utf8' });

    handleStreamError(readStream, reject);

    readStream.on('end', () => {
      process.stdout.write('\n');
      resolve();
    });

    readStream.pipe(process.stdout);
  });
};

export default cat;
