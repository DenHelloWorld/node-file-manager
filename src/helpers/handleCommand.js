import COMMANDS from '../commands/commands.js';
import printWorkingDirectory from '../utils/printWorkingDirectory.js';
import { printError } from './printText.js';

const handleCommand = async (command, params) => {
  const cmd = COMMANDS[command];

  if (!cmd) {
    printError('Invalid input');
    printError(
      `Command "${command}" not found. Available commands: ${Object.keys(
        COMMANDS
      ).join(', ')}`
    );
    printWorkingDirectory();
    return;
  }

  if (cmd.args !== 0 && params.length !== cmd.args) {
    printError('Invalid input');
    printError(
      `The number of arguments for command "${command}" should be ${cmd.args}.`
    );
    printError('If your argument contain spaces, please wrap it in quotes.');
    printWorkingDirectory();
    return;
  }

  try {
    await cmd.fn(...params);
  } catch (e) {
    printError(`Operation failed: ${e.message}`);
  } finally {
    printWorkingDirectory();
  }
};
export default handleCommand;
