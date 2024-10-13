const handleStreamError = (stream, reject) => {
  stream.on('error', (error) => {
    reject(error);
  });
};
export default handleStreamError;
