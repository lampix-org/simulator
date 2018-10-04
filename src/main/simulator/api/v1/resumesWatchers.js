const { parseIfString } = require('../../../utils/parseIfString');

const resumesWatchers = (state, browser) => ({
  resumeWatchers(watcherIds = []) {
    const { watcherData } = state;
    const parsedData = parseIfString(watcherIds);

    watcherData.paused = watcherData.paused.filter((id) => !parsedData.includes(id));

    // Notify of each watcher pausing separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      browser.webContents.executeJavaScript(`onWatcherResumed('${id}')`);
    });
  }
});

exports.resumesWatchers = resumesWatchers;
