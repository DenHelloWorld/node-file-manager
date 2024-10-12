import * as readline from 'node:readline/promises';
import getUsername from './utils/getUsername.js';
import welcomeUser from './utils/welcomeUser.js';
import goodbyeUser from './utils/goodbyeUser.js';
import printWorkingDirectory from './utils/printWorkingDirectory.js';
import toHomeDirectory from './utils/toHomeDirectory.js';
import handleInput from './helpers/handleInput.js';

const app = async (args) => {
  const username = getUsername(args);
  toHomeDirectory();
  welcomeUser(username);
  printWorkingDirectory();

  const rl = readline
    .createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    .on('line', async (input) => {
      if (!input) {
        printWorkingDirectory();
        return;
      }
      await handleInput(input, username, rl);
    })
    .on('SIGINT', () => {
      goodbyeUser(username);
      rl.close();
    });
};

await app(process.argv.slice(2));
