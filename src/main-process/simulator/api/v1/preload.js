const { ipcRenderer } = require('electron');
const {
  SIMPLE_CLICK,
  POSITION_CLICK,
  REGISTER_SIMPLE,
  REGISTER_POSITION,
  GET_LAMPIX_INFO,
  TRANSFORM_COORDINATES,
  GET_APPS,
  SWITCH_TO_APP,
  REMOVE_WATCHERS
} = require('../../../ipcEvents');
const { isClassifier } = require('../../../utils/isClassifier');
const { isSegmenter } = require('../../../utils/isSegmenter');

const { Logger } = require('../../../Logger');

window.ipcRenderer = ipcRenderer;

const urlQueryParams = new URLSearchParams(global.location.search);
const appUrl = urlQueryParams.get('url');

const logRegisteredAreas = (rectangles) => {
  Logger.verbose('Data to register:');
  Logger.verbose(JSON.stringify(rectangles, null, 2));
};

const createClientEventPayload = (event) => ({
  url: appUrl,
  mouseX: event.clientX,
  mouseY: event.clientY
});

const createRegisterPayload = (rectangles) => ({
  url: appUrl,
  rectangles
});

const payload = (data) => Object.assign(data, {
  url: appUrl
});

window.addEventListener('click', (event) => {
  ipcRenderer.send(SIMPLE_CLICK, createClientEventPayload(event));
});

window.addEventListener('contextmenu', (event) => {
  ipcRenderer.send(POSITION_CLICK, createClientEventPayload(event));
});

window._lampix_internal = {
  add_watchers: (watchers = []) => {
    Logger.info('add_watchers called');
    logRegisteredAreas(watchers);

    watchers = JSON.parse(watchers); // eslint-disable-line
    const classifiers = watchers.filter(isClassifier);
    const segmenters = watchers.filter(isSegmenter);

    if (classifiers.length) {
      ipcRenderer.send(REGISTER_SIMPLE, createRegisterPayload(classifiers));
    }

    if (segmenters.length) {
      ipcRenderer.send(REGISTER_POSITION, createRegisterPayload(segmenters));
    }
  },
  remove_watchers: (watcherIds = []) => {
    Logger.info('remove_watchers called');

    ipcRenderer.send(REMOVE_WATCHERS, payload({ watcherIds }));
  },
  getLampixInfo: () => ipcRenderer.send(GET_LAMPIX_INFO, {
    url: appUrl
  }),
  transformCoordinates: (rect) => ipcRenderer.send(TRANSFORM_COORDINATES, {
    url: appUrl,
    rect
  }),
  getApps: () => ipcRenderer.send(GET_APPS, {
    url: appUrl
  }),
  switchToApp: (newApp) => ipcRenderer.send(SWITCH_TO_APP, {
    toClose: appUrl,
    toOpen: newApp
  })
};
