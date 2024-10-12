import COMMANDS from '../commands/commands.js';
import printWorkingDirectory from '../utils/printWorkingDirectory.js';
import { printError } from './printText.js';

const handleCommand = async (command, params) => {
  const cmd = COMMANDS[command];

  if (!cmd) {
    printError('Invalid input');
    return;
  }

  try {
    await cmd.fn(...params);
  } catch (e) {
    printError(`'Operation failed' ${e.message}`);
  } finally {
    printWorkingDirectory();
  }
};
export default handleCommand;
