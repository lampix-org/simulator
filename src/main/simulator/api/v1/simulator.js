const path = require('path');

// Logging
const { Logger } = require('../../../Logger');

// Utils
const { naiveIDGenerator } = require('../../../utils/naiveIDGenerator');
const { createOwnBrowser } = require('../../createOwnBrowser');
const { preloadName } = require('../../preloadName');
const { createWatcherDataCategories } = require('../../createWatcherDataCategories');
const { createSettings } = require('../../createSettings');

// API
const { sendsLampixInfo } = require('../common/sendsLampixInfo');
const { sendsApps } = require('../common/sendsApps');
const { transformsCoordinates } = require('../common/transformsCoordinates');
const { handlesClassifierWatchers } = require('../common/watcher-management/handlesClassifierWatchers');
const { handlesSegmenterWatchers } = require('../common/watcher-management/handlesSegmenterWatchers');
const { removesWatchers } = require('./removesWatchers');
const { addsWatchers } = require('./addsWatchers');
const { pausesWatchers } = require('./pausesWatchers');
const { resumesWatchers } = require('./resumesWatchers');
const { updatesWatcherShape } = require('./updatesWatcherShape');

// Calls to browser
const { onObjectClassified } = require('./onObjectClassified');
const { onObjectsDetected } = require('./onObjectsDetected');
const { onObjectsLocated } = require('./onObjectsLocated');

// Internals
const { sendsSettingsToAdmin } = require('../../internal/sendsSettingsToAdmin');

// Settings
const { defaultSettings } = require('../v0/defaultSettings');

const version = 'v1';
const v1SpecificWatcherData = () => Object.assign(createWatcherDataCategories(), {
  paused: []
});

const simulator = (url, {
  store,
  configStore,
  isDev,
  onClosed,
  updateAdminUI
}) => {
  const settings = createSettings({
    store,
    version,
    url,
    defaults: defaultSettings
  });

  // Registered data represents volatile information, not persisted
  // All of this information comes strictly from the simulated application
  // through register events
  const state = {
    updateAdminUI,
    settings,
    apiVersion: version,
    watcherData: v1SpecificWatcherData(),
    id: naiveIDGenerator()
  };

  const { window, appBrowser } = createOwnBrowser({
    configStore,
    onClosed,
    preloadPath: path.join(__dirname, preloadName(isDev, state.apiVersion))
  });

  return Object.assign(
    {
      window,
      appBrowser,
      settings,
      watcherData: state.watcherData,
      resetData() {
        state.watcherData = Object.assign(state.watcherData, v1SpecificWatcherData());
      }
    },
    addsWatchers(state, appBrowser),
    removesWatchers(state, appBrowser),
    pausesWatchers(state, appBrowser),
    resumesWatchers(state, appBrowser),
    updatesWatcherShape(state, appBrowser),
    handlesClassifierWatchers({
      state,
      browser: appBrowser,
      logger: Logger,
      onObjectClassified
    }),
    handlesSegmenterWatchers({
      state,
      browser: appBrowser,
      logger: Logger,
      onObjectsLocated,
      onObjectsDetected
    }),
    sendsLampixInfo(state, appBrowser, configStore),
    sendsApps(state, appBrowser, configStore),
    sendsSettingsToAdmin(state, updateAdminUI),
    transformsCoordinates(
      appBrowser,
      configStore
    ),
  );
};

exports.simulator = simulator;