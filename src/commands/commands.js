import {
  copyFile,
  moveFile,
  deleteFile,
  renameFile,
} from './fileOperations.js';
import { getOSInfo } from './systemInfo.js';
import { hashFile } from './hash.js';
import { compressFile, decompressFile } from './compression.js';
import up from './up.js';
import cd from './cd.js';
import ls from './ls.js';
import cat from './cat.js';
import add from './add.js';
import rn from './rn.js';

const COMMANDS = {
  copy: { fn: (src, dest) => copyFile(src, dest) },
  move: { fn: (src, dest) => moveFile(src, dest) },
  delete: { fn: (file) => deleteFile(file) },
  rename: { fn: (oldName, newName) => renameFile(oldName, newName) },
  'os-info': { fn: () => getOSInfo() },
  hash: { fn: (file) => hashFile(file) },
  compress: { fn: (file, dest) => compressFile(file, dest) },
  decompress: { fn: (file, dest) => decompressFile(file, dest) },
  up: { fn: async () => await up() },
  cd: { fn: async (path) => await cd(path) },
  ls: { fn: async () => await ls() },
  cat: { fn: async (filePath) => await cat(filePath) },
  add: { fn: async (fileName) => await add(fileName) },
  rn: {
    fn: async (pathToFile, newFileName) => await rn(pathToFile, newFileName), args: 2,
  },
};
export default COMMANDS;
