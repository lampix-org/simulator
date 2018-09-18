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
const { setsClassifierWatchers } = require('../common/watcher-management/setsClassifierWatchers');
const { setsSegmenterWatchers } = require('../common/watcher-management/setsSegmenterWatchers');

// Calls to browser
const { onClassification } = require('./onClassification');
const { onSegmentationStart } = require('./onSegmentationStart');
const { onSegmentationEnd } = require('./onSegmentationEnd');

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
  const watcherData = createWatcherDataCategories(true);

  const state = {
    updateAdminUI,
    id: naiveIDGenerator(),
    apiVersion: version,
    settings,
    watcherData
  };

  const browser = createOwnBrowser({
    configStore,
    onClosed,
    preloadPath: path.join(__dirname, preloadName(isDev, state.apiVersion))
  });

  return Object.assign(
    {
      browser,
      settings,
      watcherData
    },
    setsClassifierWatchers(state),
    setsSegmenterWatchers(state),
    handlesClassifierWatchers({
      state,
      browser,
      logger: Logger,
      onClassification
    }),
    handlesSegmenterWatchers({
      state,
      browser,
      logger: Logger,
      onSegmentationStart,
      onSegmentationEnd
    }),
    sendsLampixInfo(state, browser, configStore),
    sendsApps(state, browser, configStore),
    sendsSettingsToAdmin(state, updateAdminUI),
    transformsCoordinates(
      browser,
      configStore
    )
  );
};

exports.simulator = simulator;
