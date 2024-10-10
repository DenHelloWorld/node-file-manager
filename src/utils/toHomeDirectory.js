import { chdir } from 'node:process';
import { homedir } from 'node:os';

const toHomeDirectory = () => {
  chdir(homedir());
};
export default toHomeDirectory;
