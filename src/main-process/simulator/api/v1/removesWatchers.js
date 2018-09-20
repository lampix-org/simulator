const { parseIfString } = require('../../../utils/parseIfString');
const { getWatcherName } = require('../compatibility/getWatcherName');

const removesWatchers = (state, browser) => ({
  removeWatchers(watcherIds = []) {
    const { watcherData: { segmenters } } = state;

    const parsedData = parseIfString(watcherIds);
    segmenters.watchers = segmenters.watchers.filter((w) => !parsedData.includes(w.id));
    segmenters.names = [...new Set(segmenters.watchers.map((w) => getWatcherName(w)))];

    // Notify of each watcher removal separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      browser.webContents.executeJavaScript(`onWatcherRemoved('${id}')`);
    });
  }
});

exports.removesWatchers = removesWatchers;
