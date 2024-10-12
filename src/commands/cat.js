import { printError, printText } from '../helpers/printText.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream';
import { cwd } from 'node:process';

const cat = (filePath) => {
  const fullPath = path.resolve(cwd(), filePath);

  const readStream = fs.createReadStream(fullPath, { encoding: 'utf8' });

  readStream.on('error', (error) => {
    printError(`Error reading file: ${error.message}`);
  });

  readStream.pipe(process.stdout);

  readStream.on('end', () => {
    process.stdout.write('\n');
  });
};

export default cat;
