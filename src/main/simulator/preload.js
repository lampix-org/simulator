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

// Allow simulator:// requests
webFrame.registerURLSchemeAsPrivileged('simulator', {
  bypassCSP: false
});

window.ipcRenderer = ipcRenderer;

const urlQueryParams = new URLSearchParams(global.location.search);
const appUrl = urlQueryParams.get('url');

const payload = (data = {}) => Object.assign(data, {
  url: appUrl
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
  add_watchers: (watchers = []) => {
    Logger.info('add_watchers called');
    ipcRenderer.send(ADD_WATCHERS, payload({ watchers }));
  },
  remove_watchers: (watcherIds = []) => {
    Logger.info('remove_watchers called');
    ipcRenderer.send(REMOVE_WATCHERS, payload({ watcherIds }));
  },
  pause_watchers: (watcherIds = []) => {
    Logger.info('pause_watchers called');
    ipcRenderer.send(PAUSE_WATCHERS, payload({ watcherIds }));
  },
  resume_watchers: (watcherIds = []) => {
    Logger.info('resume_watchers called');
    ipcRenderer.send(RESUME_WATCHERS, payload({ watcherIds }));
  },
  update_watcher_shape: (watcherId, shape) => {
    Logger.info('update_watcher_shape called');
    ipcRenderer.send(UPDATE_WATCHER_SHAPE, payload({ watcherId, shape }));
  },
  get_lampix_info: (requestJson) => ipcRenderer.send(GET_LAMPIX_INFO, payload({ requestJson })),
  transform_coordinates: (rect) => ipcRenderer.send(TRANSFORM_COORDINATES, {
    url: appUrl,
    rect
  }),
  get_apps: (requestJson) => ipcRenderer.send(GET_APPS, payload({ requestJson })),
  get_config_data: () => ipcRenderer.send(GET_APP_CONFIG, {
    url: appUrl
  }),
  switch_to_app: (newApp, queryParams) => ipcRenderer.send(SWITCH_TO_APP, {
    queryParams,
    toClose: appUrl,
    toOpen: newApp
  }),
  write_file: (requestJson) => ipcRenderer.send(WRITE_FILE, payload({ requestJson })),
  read_file: (requestJson) => ipcRenderer.send(READ_FILE, payload({ requestJson }))
};
