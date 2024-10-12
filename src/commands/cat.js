import { printError, printText } from '../helpers/printText.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream';
import { cwd } from 'node:process';

const cat = (filePath) => {
  const fullPath = path.resolve(cwd(), filePath);

  const readStream = fs.createReadStream(fullPath, { encoding: 'utf8' });

  pipeline(readStream, process.stdout, (error) => {
    if (error) {
      printError(`Error reading file: ${error.message}`);
    } else {
      process.stdout.write('\nFinished reading the file.\n');
    }
  });
};

export default cat;
