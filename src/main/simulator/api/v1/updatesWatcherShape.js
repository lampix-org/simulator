const { parseIfString } = require('../../../utils/parseIfString');

const updatesWatcherShape = (state, browser) => ({
  updateWatcherShape(watcherId, shape) {
    const {
      watcherData: {
        classifiers,
        segmenters
      }
    } = state;

    const watchers = [
      ...classifiers.watchers,
      ...segmenters.watchers
    ];

    const watcher = watchers.find((w) => w.id === watcherId);

    // This is a naive implementation leading to unwanted results
    // TODO: Check shape integrity
    const parsedData = parseIfString(shape);
    watcher.shape = Object.assign(watcher.shape, parsedData);

    browser.webContents.executeJavaScript(`onWatcherUpdated('${watcherId}')`);
  }
});

exports.updatesWatcherShape = updatesWatcherShape;
