import path from 'node:path';
import { cwd } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { printInfo } from '../helpers/printText.js';

const hash = async (pathTofFile) => {
  const fullPath = path.resolve(cwd(), pathTofFile);
  const hash = createHash('sha256');
  const stream = createReadStream(fullPath);

  try {
    await pipeline(stream, hash);
    printInfo(hash.digest('hex') + '\n');
  } catch (error) {
    throw new Error(error.message);
  }
};
export default hash;
