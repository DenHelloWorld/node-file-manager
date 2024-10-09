const prompts = {
  // copy: (src, dest) => copyFile(src, dest),
  // move: (src, dest) => moveFile(src, dest),
  // delete: (file) => deleteFile(file),
  // rename: (oldPath, newPath) => renameFile(oldPath, newPath),
  // 'os-info': () => getOSInfo(),
  // hash: (file) => hashFile(file),
  // compress: (file, dest) => compressFile(file, dest),
  // decompress: (file, dest) => decompressFile(file, dest),
};

const handleCommand = (command, params) => {
  if (prompts[command]) {
    prompts[command](...params);
  }
};
export default handleCommand;
