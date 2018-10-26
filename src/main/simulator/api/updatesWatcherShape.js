const { parseIfString } = require('../../utils/parseIfString');

const updatesWatcherShape = (state, browser) => ({
  updateWatcherShape(watcherId, shape) {
    const {
      watcherData: { watchers }
    } = state;

    // This is a naive implementation leading to unwanted results
    // TODO: Check shape integrity
    const parsedData = parseIfString(shape);
    watchers[watcherId].shape = Object.assign(watchers[watcherId].shape, parsedData);

    browser.webContents.executeJavaScript(`onWatcherUpdated('${watcherId}')`);
  }
});

exports.updatesWatcherShape = updatesWatcherShape;
