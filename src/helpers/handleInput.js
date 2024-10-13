import COMMANDS from '../commands/commands.js';
import goodbyeUser from '../utils/goodbyeUser.js';
import handleCommand from './handleCommand.js';
import { printError } from './printText.js';

const handleInput = async (input, username, rl) => {
  const inputArgs = input.trim().match(/(\S+)(?:\s+(.+))?/);

  if (!inputArgs) {
    printError('Invalid input');
    return;
  }

  const command = inputArgs[1];
  let params = inputArgs[2] ? inputArgs[2].trim() : '';

  const cmd = COMMANDS[command];

  if (cmd) {
    if (cmd.args) {
      params = params.split(/\s+/);

      if (params.length < cmd.args) {
        printError(
          `Invalid input for command ${command}. Expected ${cmd.args} arguments.`
        );
        return;
      }
    } else {
      params = [params];
    }
  } else {
    printError('Invalid input');
    return;
  }

  if (command === '.exit') {
    goodbyeUser(username);
    rl.close();
    return;
  }

  console.log('command:', command, 'params:', params);
  await handleCommand(command, params);
};
export default handleInput;
