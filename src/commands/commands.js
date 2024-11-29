import getOsInfo from './os.js';
import up from './up.js';
import cd from './cd.js';
import ls from './ls.js';
import cat from './cat.js';
import add from './add.js';
import rn from './rn.js';
import cp from './cp.js';
import rm from './rm.js';
import mv from './mv.js';
import help from './help.js';
import hash from './hash.js';
import compress from './compress.js';
import decompress from './decompress.js';

const COMMANDS = {
  compress: {
    fn: async (pathToFile, destination) =>
      await compress(pathToFile, destination),
    args: 2,
    description: 'Compress a file and save to the destination directory',
  },
  decompress: {
    fn: async (pathToFile, destination) =>
      await decompress(pathToFile, destination),
    args: 2,
    description: 'Decompress a file and save to the destination directory',
  },
  hash: {
    fn: async (pathTofFile) => await hash(pathTofFile),
    args: 1,
    description: 'Calculate the SHA256 hash of a file',
  },
  mv: {
    fn: async (path, directory) => await mv(path, directory),
    args: 2,
    description: 'Move a file to a new directory',
  },
  rm: {
    fn: async (pathToFile) => await rm(pathToFile),
    args: 1,
    description: 'Remove a file',
  },
  os: {
    fn: async (...args) => await getOsInfo(...args),
    args: 0,
    description: 'Get information about the operating system',
  },
  up: {
    fn: async () => await up(),
    args: 0,
    description: 'Move up one directory',
  },
  cd: {
    fn: async (path) => await cd(path),
    args: 1,
    description: 'Change the current working directory',
  },
  ls: {
    fn: async () => await ls(),
    args: 0,
    description: 'List the contents of the current directory',
  },
  help: {
    fn: async () => await help(),
    args: 0,
    description:
      'Display the list of available commands and their descriptions',
  },
  cat: {
    fn: async (path) => await cat(path),
    args: 1,
    description: 'Read and display the contents of a file',
  },
  add: {
    fn: async (newFileName) => await add(newFileName),
    args: 1,
    description: 'Create a new empty file',
  },
  rn: {
    fn: async (path, newFilename) => await rn(path, newFilename),
    args: 2,
    description: 'Rename a file',
  },
  cp: {
    fn: async (path, directory) => await cp(path, directory),
    args: 2,
    description: 'Copy a file to a new directory',
  },
};

export default COMMANDS;
