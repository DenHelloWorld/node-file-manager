import { cwd } from 'node:process';

export default () => {
  process.stdout.write(`You are currently in ${cwd()}\n`);
};
