import COMMANDS from '../commands/commands.js';
import { printError } from './printText.js';

const handleCommand = async (command, params) => {
  const cmd = COMMANDS[command];

  if (!cmd) {
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
