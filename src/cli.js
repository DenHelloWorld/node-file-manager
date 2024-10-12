import * as readline from 'node:readline/promises';
import getUsername from './utils/getUsername.js';
import welcomeUser from './utils/welcomeUser.js';
import goodbyeUser from './utils/goodbyeUser.js';
import handleCommand from './helpers/handleCommand.js';
import printWorkingDirectory from './utils/printWorkingDirectory.js';
import toHomeDirectory from './utils/toHomeDirectory.js';

const app = async (args) => {
  const username = getUsername(args);
  const command = args[0];
  const params = args.slice(1);
  toHomeDirectory();
  welcomeUser(username);
  printWorkingDirectory();

  const rl = readline
    .createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    .on('line', async (input) => {
      const inputArgs = input.trim().match(/(\S+)(?:\s+(.+))?/);
      const newCommand = inputArgs[1];
      const newParams = inputArgs[2] ? [inputArgs[2].trim()] : [];

      if (newCommand === '.exit') {
        goodbyeUser(username);
        rl.close();
      }
      await handleCommand(newCommand, newParams);
    })
    .on('SIGINT', () => {
      goodbyeUser(username);
      rl.close();
    });
};

await app(process.argv.slice(2));
