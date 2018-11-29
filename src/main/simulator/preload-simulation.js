const { ipcRenderer, webFrame } = require('electron');
const {
  LEFT_CLICK,
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS,
  SWITCH_TO_APP,
  ADD_WATCHERS,
  REMOVE_WATCHERS,
  PAUSE_WATCHERS,
  RESUME_WATCHERS,
  BEFORE_UNLOAD,
  UPDATE_WATCHER_SHAPE,
  GET_APP_CONFIG,
  WRITE_FILE,
  READ_FILE
} = require('../ipcEvents');

const { Logger } = require('../Logger');
const { simulationKeybindings } = require('./simulationKeybindings');

// Allow simulator:// requests
webFrame.registerURLSchemeAsPrivileged('simulator', {
  bypassCSP: false
});

window.ipcRenderer = ipcRenderer;

const urlQueryParams = new URLSearchParams(global.location.search);
const appUrl = urlQueryParams.get('url');
const windowId = Number(urlQueryParams.get('windowId'));

const payload = (data = {}) => Object.assign(data, {
  url: appUrl,
  windowId
});

const createClientEventPayload = (event) => payload({
  mouseX: event.clientX,
  mouseY: event.clientY
});

window.addEventListener('click', (event) => {
  ipcRenderer.send(LEFT_CLICK, createClientEventPayload(event));
});

window.onbeforeunload = () => {
  // Can only catch in renderer here
  // Use this to reset registered watchers data in simulator v1
  ipcRenderer.send(BEFORE_UNLOAD, payload());
};

window._lampix_internal = {
  add_watchers: (requestJson) => {
    Logger.info('add_watchers called');
    ipcRenderer.send(ADD_WATCHERS, payload({ requestJson }));
  },
  remove_watchers: (requestJson) => {
    Logger.info('remove_watchers called');
    ipcRenderer.send(REMOVE_WATCHERS, payload({ requestJson }));
  },
  pause_watchers: (requestJson) => {
    Logger.info('pause_watchers called');
    ipcRenderer.send(PAUSE_WATCHERS, payload({ requestJson }));
  },
  resume_watchers: (requestJson) => {
    Logger.info('resume_watchers called');
    ipcRenderer.send(RESUME_WATCHERS, payload({ requestJson }));
  },
  update_watcher_shape: (requestJson) => {
    Logger.info('update_watcher_shape called');
    ipcRenderer.send(UPDATE_WATCHER_SHAPE, payload({ requestJson }));
  },
  get_lampix_info: (requestJson) => ipcRenderer.send(GET_LAMPIX_INFO, payload({ requestJson })),
  transform_coordinates: (requestJson) => ipcRenderer.send(TRANSFORM_COORDINATES, payload({ requestJson })),
  get_apps: (requestJson) => ipcRenderer.send(GET_APPS, payload({ requestJson })),
  get_config_data: () => ipcRenderer.send(GET_APP_CONFIG, {
    url: appUrl
  }),
  switch_to_app: (requestJson) => ipcRenderer.send(SWITCH_TO_APP, payload({ requestJson })),
  write_file: (requestJson) => ipcRenderer.send(WRITE_FILE, payload({ requestJson })),
  read_file: (requestJson) => ipcRenderer.send(READ_FILE, payload({ requestJson }))
};

simulationKeybindings(ipcRenderer, payload);
