const { parseIfString } = require('../../../utils/parseIfString');
const { getWatcherName } = require('../compatibility/getWatcherName');

const removesWatchers = (state, browser) => ({
  removeWatchers(watcherIds = []) {
    const {
      watcherData: {
        classifiers,
        segmenters
      }
    } = state;

    const parsedData = parseIfString(watcherIds);
    const shouldRemain = (w) => !parsedData.includes(w.id);
    const updateWatchersAndNames = (collection) => {
      collection.watchers = collection.watchers.filter(shouldRemain);
      collection.names = [...new Set(collection.watchers.map(getWatcherName))];
    };

    updateWatchersAndNames(classifiers);
    updateWatchersAndNames(segmenters);

    // Notify of each watcher removal separately
    // This simulates device reality as things may take time on that end
    parsedData.forEach((id) => {
      browser.webContents.executeJavaScript(`onWatcherRemoved('${id}')`);
    });
  }
});

exports.removesWatchers = removesWatchers;
