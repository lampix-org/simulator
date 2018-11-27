// Module to control application life.
const { app, Menu, protocol } = require('electron');
const url = require('url');
const path = require('path');
const getPort = require('get-port');

const { initialize } = require('./initialize');
const { enableFileServing } = require('./enableFileServing');
const { registerSimulatorProtocol } = require('./registerSimulatorProtocol');
const { isDev, isProd, isDebuggingProd } = require('./utils/envCheck');
const { enableUpdates } = require('./enableUpdates');
const { enableCacheBusting } = require('./enableCacheBusting');
const { Logger } = require('./Logger');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const schemePrefix = 'simulator';

// Register simulator:// as standard scheme
// https://electronjs.org/docs/api/protocol#protocolregisterstandardschemesschemes-options
protocol.registerStandardSchemes([schemePrefix]);

const installExtensions = async () => {
  const installer = require('electron-devtools-installer'); // eslint-disable-line
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

async function createWindow() {
  if (isDev || isDebuggingProd) {
    await installExtensions();
  }

  initialize();

  const appURL = isDev ? `http://localhost:${process.env.PORT}` : url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  if (isProd) {
    const menuTemplate = [
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectall' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' }
        ]
      },
      {
        role: 'window',
        submenu: [
          { role: 'close' }
        ]
      }
    ];
    menuTemplate.unshift({
      label: app.getName(),
      submenu: [
        { role: 'quit' }
      ]
    });
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }
  // Create the admin window and load the index.html of the app.
  const { admin } = require('./Admin'); // eslint-disable-line
  admin.browser.loadURL(appURL);

  // TL;DR: simulator://<app-name> => http://localhost:<port>/app-name
  // Get available port
  // Make it known to Admin for protocol forwarding
  // Enable file serving
  getPort().then((port) => {
    const serverUrl = `http://localhost:${port}`;
    admin.localServerOrigin = serverUrl;
    registerSimulatorProtocol(schemePrefix, serverUrl);
    enableFileServing(port);
  });

  Logger.setAdminBrowser(admin.browser);
  enableUpdates();
  enableCacheBusting();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
