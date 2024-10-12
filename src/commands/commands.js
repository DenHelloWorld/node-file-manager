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

const COMMANDS = {
  copy: { fn: (src, dest) => copyFile(src, dest), args: 2 },
  move: { fn: (src, dest) => moveFile(src, dest), args: 2 },
  delete: { fn: (file) => deleteFile(file), args: 1 },
  rename: { fn: (oldName, newName) => renameFile(oldName, newName), args: 2 },
  'os-info': { fn: () => getOSInfo(), args: 0 },
  hash: { fn: (file) => hashFile(file), args: 1 },
  compress: { fn: (file, dest) => compressFile(file, dest), args: 2 },
  decompress: { fn: (file, dest) => decompressFile(file, dest), args: 2 },
  up: { fn: async () => await up(), args: 0 },
  cd: { fn: async (path) => await cd(path), args: 1 },
  ls: { fn: async () => await ls(), args: 0 },
};
export default COMMANDS;
