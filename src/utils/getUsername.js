const getUsername = (args) => {
  const npmUsername = process.env.npm_config_username;

  if (npmUsername) {
    return npmUsername;
  }

  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  return usernameArg ? usernameArg.split('=')[1] : 'Guest';
};

export default getUsername;
