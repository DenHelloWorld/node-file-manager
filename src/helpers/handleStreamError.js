const handleStreamError = (stream, reject) => {
  stream.on('error', (error) => {
    printError(`Error: ${error.message}`);
    reject(error);
  });
};
export default handleStreamError;
