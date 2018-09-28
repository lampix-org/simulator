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

    const watcher = watchers.find((w) => w.id);

    // This is a naive implementation leading to unwanted results
    // TODO: Check shape integrity
    watcher.shape = Object.assign(watcher.shape, shape);

    browser.webContents.executeJavaScript(`onWatcherUpdated('${watcherId}')`);
  }
});

exports.updatesWatcherShape = updatesWatcherShape;
