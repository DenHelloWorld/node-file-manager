import { cwd } from 'node:process';
import { printInfo } from '../helpers/printText.js';

const printWorkingDirectory = () => {
  printInfo(`You are currently in ${cwd()}\n`);
};
export default printWorkingDirectory;
