const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

export const printText = (text, color) => {
  if (colors[color]) {
    process.stdout.write(`${colors[color]}${text}${colors.reset}\n`);
  } else {
    process.stdout.write(`${colors.white}${text}${colors.reset}\n`);
  }
};
export const prinSuccess = (text) => printText(text, 'green');
export const printError = (text) => printText(text, 'red');
export const printInfo = (text) => printText(text, 'blue');
export const print = (text) => printText(text, 'white');
