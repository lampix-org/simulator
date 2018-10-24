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
const { removesWatchers } = require('./watcher-management/removesWatchers');
const { addsWatchers } = require('./watcher-management/addsWatchers');
const { pausesWatchers } = require('./watcher-management/pausesWatchers');
const { resumesWatchers } = require('./watcher-management/resumesWatchers');
const { updatesWatcherShape } = require('./updatesWatcherShape');
const { handlesClassification } = require('./watcher-management/handlesClassification');

// Calls to browser
const { onObjectsClassified } = require('./onObjectsClassified');
const { onObjectsLocated } = require('./onObjectsLocated');

// Internals
const { sendsSettingsToAdmin } = require('../../internal/sendsSettingsToAdmin');

// Settings
const { defaultSettings } = require('./defaultSettings');

const version = 'v1';
const watcherData = () => createWatcherDataCategories('v1');

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
    watcherData: watcherData(),
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
        state.watcherData = Object.assign(state.watcherData, watcherData());
      }
    },
    addsWatchers(state, appBrowser),
    removesWatchers(state, appBrowser),
    pausesWatchers(state, appBrowser),
    resumesWatchers(state, appBrowser),
    updatesWatcherShape(state, appBrowser),
    sendsLampixInfo(state, appBrowser, configStore),
    sendsApps(state, appBrowser, configStore),
    sendsSettingsToAdmin(state, updateAdminUI),
    transformsCoordinates(
      appBrowser,
      configStore
    ),
    handlesClassification({
      state,
      onObjectsLocated,
      onObjectsClassified,
      logger: Logger,
      browser: appBrowser
    })
  );
};

exports.simulator = simulator;
