const getUsername = (args) => {
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  return usernameArg ? usernameArg.split('=')[1] : 'Guest';
};
export default getUsername;
