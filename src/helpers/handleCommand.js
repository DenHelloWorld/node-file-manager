import COMMANDS from '../commands/commands.js';
import { printError } from './printText.js';

const handleCommand = async (command, params) => {
  const cmd = COMMANDS[command];

  if (!cmd || params.length !== cmd.args) {
    printError('Invalid input');
    return;
  }

  try {
    await cmd.fn(...params);
  } catch {
    printError('Operation failed');
  }
};
export default handleCommand;
