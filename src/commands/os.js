import { EOL, cpus, homedir as getHomedir, userInfo, arch } from 'node:os';
import { printError, printInfo } from '../helpers/printText.js';

const eolInfo = async () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(printInfo(`Default system End-Of-Line: ${JSON.stringify(EOL)}`));
    } catch (error) {
      reject(`Error fetching EOL info: ${error.message}`);
    }
  });
};

const cpuInfo = async () => {
  return new Promise((resolve, reject) => {
    try {
      const cpuInfo = cpus();
      printInfo(`Total number of CPUs: ${cpuInfo.length}`);
      cpuInfo.forEach((cpu, index) => {
        printInfo(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
      });
      resolve();
    } catch (error) {
      reject(`Error fetching CPU info: ${error.message}`);
    }
  });
};

const homedirInfo = async () => {
  return new Promise((resolve, reject) => {
    try {
      const homeDirectory = getHomedir();
      printInfo(`Home directory: ${homeDirectory}`);
      resolve(homeDirectory);
    } catch (error) {
      reject(`Error fetching home directory: ${error.message}`);
    }
  });
};

const usernameInfo = async () => {
  return new Promise((resolve, reject) => {
    try {
      const user = userInfo();
      printInfo(`Current system user name : ${user.username}`);
      resolve(user.username);
    } catch (error) {
      reject(`Error fetching username: ${error.message}`);
    }
  });
};

const archInfo = async () => {
  return new Promise((resolve) => {
    const cpuArchitecture = arch();
    printInfo(`CPU architecture: ${cpuArchitecture}`);
    resolve(cpuArchitecture);
  });
};

const getOsInfo = async (...params) => {
  for (const command of params) {
    try {
      switch (command) {
        case '--EOL':
          await eolInfo();
          break;
        case '--cpus':
          await cpuInfo();
          break;
        case '--homedir':
          await homedirInfo();
          break;
        case '--username':
          await usernameInfo();
          break;
        case '--architecture':
          await archInfo();
          break;
        default:
          printError(`Command "${command}" not recognized.`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
export default getOsInfo;
