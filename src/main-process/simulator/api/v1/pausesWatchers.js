const { parseIfString } = require('../../../utils/parseIfString');

const pausesWatchers = (state, browser) => ({
  pauseWatchers(watcherIds = []) {
    const { watcherData } = state;
    const parsedData = parseIfString(watcherIds);

    watcherData.paused = [...new Set([...watcherData.paused, ...parsedData])];

    // Notify of each watcher pausing separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      browser.webContents.executeJavaScript(`onWatcherPaused('${id}')`);
    });
  }
});

exports.pausesWatchers = pausesWatchers;
