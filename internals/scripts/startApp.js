const net = require('net');
const { spawn } = require('child_process');
const getPort = require('get-port');
const pkg = require('../../package.json');

const spawnOptions = {
  stdio: 'inherit',
  shell: true
};

const env = Object.create(process.env);
env.VERSION = pkg.version;

const client = new net.Socket();
let electronStarted = false;

const tryConnectingToRenderer = (port) => {
  client.connect({ port }, () => {
    client.end();

    if (!electronStarted) {
      console.log('Starting electron...');
      electronStarted = true;

      spawn('npm run start-main', {
        ...spawnOptions,
        env
      });
    }
  });
};

const start = () => {
  getPort().then((port) => {
    client.on('error', () => {
      setTimeout(() => tryConnectingToRenderer(port), 1000);
    });

    env.PORT = port;

    spawn('npm run start-renderer', {
      ...spawnOptions,
      env
    });

    tryConnectingToRenderer(port);
  });
};

start();
