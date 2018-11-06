const path = require('path');

// Logging
const { Logger } = require('../Logger');

// Utils
const { naiveIDGenerator } = require('../utils/naiveIDGenerator');
const { createOwnBrowser } = require('./createOwnBrowser');
const { preloadName } = require('./preloadName');
const { createWatcherDataCategories } = require('./createWatcherDataCategories');
const { createSettings } = require('./createSettings');

// API
const { sendsLampixInfo } = require('./api/sendsLampixInfo');
const { sendsApps } = require('./api/sendsApps');
const { transformsCoordinates } = require('./api/transformsCoordinates');
const { removesWatchers } = require('./api/watcher-management/removesWatchers');
const { addsWatchers } = require('./api/watcher-management/addsWatchers');
const { pausesWatchers } = require('./api/watcher-management/pausesWatchers');
const { resumesWatchers } = require('./api/watcher-management/resumesWatchers');
const { updatesWatcherShape } = require('./api/updatesWatcherShape');
const { handlesClassification } = require('./api/watcher-management/handlesClassification');
const { writesFile } = require('./api/writesFile');

// Calls to browser
const { onObjectsClassified } = require('./api/onObjectsClassified');
const { onObjectsLocated } = require('./api/onObjectsLocated');

// Internals
const { sendsSettingsToAdmin } = require('./internal/sendsSettingsToAdmin');

// Settings
const { defaultSettings } = require('./api/defaultSettings');

const watcherData = () => createWatcherDataCategories();

const simulator = (url, {
  store,
  configStore,
  isDev,
  onClosed,
  updateAdminUI
}) => {
  const settings = createSettings({
    store,
    url,
    defaults: defaultSettings
  });

  // Registered data represents volatile information, not persisted
  // All of this information comes strictly from the simulated application
  // through register events
  const state = {
    updateAdminUI,
    settings,
    watcherData: watcherData(),
    id: naiveIDGenerator()
  };

  const { window, appBrowser } = createOwnBrowser({
    configStore,
    onClosed,
    preloadPath: path.join(__dirname, preloadName(isDev))
  });

  return Object.assign(
    {
      window,
      appBrowser,
      settings,
      watcherData: state.watcherData,
      resetData() {
        state.watcherData = Object.assign(state.watcherData, { watchers: {} });
      }
    },
    addsWatchers(state, appBrowser),
    removesWatchers(state, appBrowser),
    pausesWatchers(state, appBrowser),
    resumesWatchers(state, appBrowser),
    updatesWatcherShape(state, appBrowser),
    handlesClassification({
      state,
      onObjectsLocated,
      onObjectsClassified,
      logger: Logger,
      browser: appBrowser
    }),
    sendsLampixInfo(state, appBrowser, configStore),
    sendsApps(state, appBrowser, configStore),
    sendsSettingsToAdmin(state, updateAdminUI),
    transformsCoordinates(
      appBrowser,
      configStore
    ),
    writesFile({
      browser: appBrowser,
      url,
      logger: Logger
    })
  );
};

exports.simulator = simulator;
