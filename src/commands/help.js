import COMMANDS from './commands.js';

const help = async () => {
  const commands = Object.entries(COMMANDS).map(([command, details]) => ({
    Command: command,
    Description: details.description,
  }));

  console.table(commands);
};
export default help;
