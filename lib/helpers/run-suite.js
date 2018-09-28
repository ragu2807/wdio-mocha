const Launcher = require('webdriverio').Launcher;
const configFilePath = './config/index.js'
const args = process.argv.reduce((acc, val) => acc.concat(val.split(' ')), []);

if (args.length < 3) {
  throw new Error(
    'Error: Not enough arguments. please ensure you run this command with suite.'
  );
}

if (args[3]) {
  process.env.VIEWPORTS = args[3];
}

new Launcher(configFilePath, { suite: args[2] })
  .run()
  .then(code => process.exit(code))
  .catch(error => {
    console.error('Launcher failed to start the test', error); // eslint-disable-line no-console
    process.exit(1);
  });
