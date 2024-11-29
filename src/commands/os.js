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

const availableCommands = {
  '--EOL': eolInfo,
  '--cpus': cpuInfo,
  '--homedir': homedirInfo,
  '--username': usernameInfo,
  '--architecture': archInfo,
};

const getOsInfo = async (...params) => {
  if (params.length === 0) {
    throw new Error(
      `No commands provided. Available commands: ${Object.keys(
        availableCommands
      ).join(', ')}`
    );
  }

  for (const command of params) {
    const cmdFn = availableCommands[command];
    if (!cmdFn) {
      printError(`Command "${command}" not recognized.`);
      printInfo(
        `Available commands: ${Object.keys(availableCommands).join(', ')}`
      );
      continue;
    }

    try {
      await cmdFn();
    } catch (error) {
      throw new Error(`Error executing "${command}": ${error.message}`);
    }
  }
};
export default getOsInfo;
