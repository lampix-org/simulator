const { parseIfString } = require('../../../utils/parseIfString');

const removesWatchers = (state, browser) => ({
  removeWatchers(watcherIds = []) {
    const {
      watcherData: { watchers }
    } = state;

    const parsedData = parseIfString(watcherIds);

    // Notify of each watcher removal separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      delete watchers[id];
      browser.webContents.executeJavaScript(`onWatcherRemoved('${id}')`);
    });
  }
});

exports.removesWatchers = removesWatchers;
