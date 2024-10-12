import COLORS from '../data/colors.js';

export const printText = (text, color) => {
  if (COLORS[color]) {
    process.stdout.write(`${COLORS[color]}${text}${COLORS.reset}\n`);
  } else {
    process.stdout.write(`${COLORS.white}${text}${COLORS.reset}\n`);
  }
};
export const prinSuccess = (text) => printText(text, 'green');
export const printError = (text) => printText(text, 'red');
export const printInfo = (text) => printText(text, 'blue');
