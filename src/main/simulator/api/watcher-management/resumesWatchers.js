const { parseIfString } = require('../../../utils/parseIfString');

const resumesWatchers = (state, browser) => ({
  resumeWatchers(watcherIds = []) {
    const { watcherData: { watchers } } = state;
    const parsedData = parseIfString(watcherIds);

    // Notify of each watcher pausing separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      watchers[id].paused = false;
      browser.webContents.executeJavaScript(`onWatcherResumed('${id}')`);
    });
  }
});

exports.resumesWatchers = resumesWatchers;
