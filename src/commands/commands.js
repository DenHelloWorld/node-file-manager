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
import cp from './cp.js';
import rm from './rm.js';

const COMMANDS = {
  rm: { fn: (pathToFile) => rm(pathToFile), args: 1 },
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
  cat: { fn: async (path) => await cat(path), args: 1 },
  add: { fn: async (newFileName) => await add(newFileName), args: 1 },
  rn: {
    fn: async (path, newFilename) => await rn(path, newFilename),
    args: 2,
  },
  cp: {
    fn: async (path, directory) => await cp(path, directory),
    args: 2,
  },
};
export default COMMANDS;
