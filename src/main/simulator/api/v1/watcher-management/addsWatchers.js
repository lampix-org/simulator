const { parseIfString } = require('../../../../utils/parseIfString');

const addsWatchers = (state, browser) => ({
  addWatchers: (watcherDataStructures = []) => {
    const {
      watcherData: { watchers }
    } = state;

    const parsedData = parseIfString(watcherDataStructures);

    parsedData.forEach((w) => {
      watchers[w.id] = w;
      browser.webContents.executeJavaScript(`onWatcherAdded('${w.id}')`);
    });
  }
});

exports.addsWatchers = addsWatchers;
