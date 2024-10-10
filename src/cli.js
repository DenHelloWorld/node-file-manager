import * as readline from 'node:readline/promises';
import getUsername from './utils/getUsername.js';
import welcomeUser from './utils/welcomeUser.js';
import goodbyeUser from './utils/goodbyeUser.js';
import handleCommand from './helpers/handleCommand.js';
import printWorkingDirectory from './utils/printWorkingDirectory.js';
import toHomeDirectory from './utils/toHomeDirectory.js';

const app = (args) => {
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
    .on('line', (input) => {
      const inputArgs = input.trim().split(' ');
      const newCommand = inputArgs[0];
      const newParams = inputArgs.slice(1);

      if (newCommand === '.exit') {
        goodbyeUser(username);
        rl.close();
      }

      handleCommand(newCommand, newParams);
      printWorkingDirectory();
    })
    .on('SIGINT', () => {
      goodbyeUser(username);
      rl.close();
    });
};

app(process.argv.slice(2));
