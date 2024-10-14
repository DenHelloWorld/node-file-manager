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
import hash from './hash.js';
import compress from './compress.js';

const COMMANDS = {
  compress: {
    fn: async (pathToFile, destination) =>
      await compress(pathToFile, destination),
    args: 2,
  },
  hash: { fn: async (pathTofFile) => await hash(pathTofFile), args: 1 },
  mv: { fn: async (path, directory) => await mv(path, directory), args: 2 },
  rm: { fn: async (pathToFile) => await rm(pathToFile), args: 1 },
  os: { fn: async (...args) => await getOsInfo(...args), args: 0 },
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
