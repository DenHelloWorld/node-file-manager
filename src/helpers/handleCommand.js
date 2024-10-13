import COMMANDS from '../commands/commands.js';
import printWorkingDirectory from '../utils/printWorkingDirectory.js';
import { printError } from './printText.js';

const handleCommand = async (command, params) => {
  const cmd = COMMANDS[command];

  if (!cmd) {
    printError(
      `Command "${command}" not found. Available commands: ${Object.keys(
        COMMANDS
      ).join(', ')}`
    );
    return;
  }

  if (params.length !== cmd.args) {
    printError(
      `Invalid input: the number of arguments for command "${command}" should be ${cmd.args}. ` +
        `If your arguments contain spaces, please wrap them in quotes.`
    );
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
