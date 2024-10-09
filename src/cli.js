// import {
//   copyFile,
//   moveFile,
//   deleteFile,
//   renameFile,
// } from './commands/fileOperations';
// import { getOSInfo } from './commands/systemInfo';
// import { hashFile } from './commands/hash';
// import { compressFile, decompressFile } from './commands/compression';
import * as readline from 'node:readline/promises';
import getUsername from './utils/getUsername.js';
import welcomeUser from './utils/welcomeUser.js';
import goodbyeUser from './utils/goodbyeUser.js';
import handleCommand from './helpers/handleCommand.js';

const app = (args) => {
  const username = getUsername(args);
  welcomeUser(username);

  const command = args[0];
  const params = args.slice(1);
  handleCommand(command, params);

  const rl = readline
    .createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    .on('line', (input) => {
      const inputArgs = input.trim().split(' ');
      const newCommand = inputArgs[0];
      const newParams = inputArgs.slice(1);

      if (newCommand === '.exit') {
        goodbyeUser(username);
        rl.close();
      }

      handleCommand(newCommand, newParams);
    })
    .on('SIGINT', () => {
      goodbyeUser(username);
      rl.close();
    });
};

app(process.argv.slice(2));
