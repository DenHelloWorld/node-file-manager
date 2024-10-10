import COMMANDS from '../commands/commands.js';
import { printError } from './printText.js';

const handleCommand = (command, params) => {
  const cmd = COMMANDS[command];

  if (!cmd || params.length !== cmd.args) {
    printError('Invalid input');
    return;
  }

  try {
    cmd.fn(...params);
  } catch {
    printError('Operation failed');
  }
};
export default handleCommand;
