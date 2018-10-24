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
const { handlesMovement } = require('./watcher-management/handlesMovement');
const { handlesClassifierWatchers } = require('./watcher-management/handlesClassifierWatchers');
const { handlesSegmenterWatchers } = require('./watcher-management/handlesSegmenterWatchers');
const { setsMovementWatchers } = require('./watcher-management/setsMovementWatchers');
const { setsClassifierWatchers } = require('./watcher-management/setsClassifierWatchers');
const { setsSegmenterWatchers } = require('./watcher-management/setsSegmenterWatchers');

// Calls to browser
const { onSimpleClassifierCall } = require('./onSimpleClassifierCall');
const { onPositionClassifierCall } = require('./onPositionClassifierCall');
const { onPrePositionClassifierCall } = require('./onPrePositionClassifierCall');

// Internals
const { sendsSettingsToAdmin } = require('../../internal/sendsSettingsToAdmin');

// Settings
const { defaultSettings } = require('./defaultSettings');

const version = 'v0';

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
  const watcherData = createWatcherDataCategories('v0');

  const state = {
    updateAdminUI,
    id: naiveIDGenerator(),
    apiVersion: version,
    settings,
    watcherData
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
      watcherData
    },
    setsMovementWatchers(state),
    setsClassifierWatchers(state),
    setsSegmenterWatchers(state),
    sendsLampixInfo(state, appBrowser, configStore),
    sendsApps(state, appBrowser, configStore),
    sendsSettingsToAdmin(state, updateAdminUI),
    handlesMovement({
      state,
      browser: appBrowser
    }),
    handlesClassifierWatchers({
      state,
      browser: appBrowser,
      logger: Logger,
      onObjectClassified: onSimpleClassifierCall
    }),
    handlesSegmenterWatchers({
      state,
      browser: appBrowser,
      logger: Logger,
      onObjectsLocated: onPrePositionClassifierCall,
      onObjectsDetected: onPositionClassifierCall
    }),
    transformsCoordinates(
      appBrowser,
      configStore
    )
  );
};

exports.simulator = simulator;
