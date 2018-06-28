// Module to control application life.
const { app, Menu } = require('electron');
const url = require('url');
const path = require('path');
const { isDev, isDebuggingProd } = require('./utils/envCheck');
const { enableUpdates } = require('./enableUpdates');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

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

  const appURL = isDev ? `http://localhost:${process.env.PORT}` : url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  if (process.platform === 'darwin' && process.env.NODE_ENV === 'production') {
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
      }
    ];
    menuTemplate.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { role: 'quit' }
      ]
    });
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }
  // Create the admin window and load the index.html of the app.
  const { admin } = require('./Admin'); // eslint-disable-line
  admin.browser.loadURL(appURL);

  enableUpdates();
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
