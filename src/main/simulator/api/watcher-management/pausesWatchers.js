const { parseIfString } = require('../../../utils/parseIfString');

const pausesWatchers = (state, browser) => ({
  pauseWatchers(watcherIds = []) {
    const { watcherData: { watchers } } = state;
    const parsedData = parseIfString(watcherIds);

    // Notify of each watcher pausing separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      watchers[id].paused = true;
      browser.webContents.executeJavaScript(`onWatcherPaused('${id}')`);
    });
  }
});

exports.pausesWatchers = pausesWatchers;
