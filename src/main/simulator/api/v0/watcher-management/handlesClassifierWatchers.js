const { getWatcherName } = require('../../compatibility/getWatcherName');
const { getWatcherShape } = require('../../compatibility/getWatcherShape');
const { pointInShape } = require('../../../../utils/pointInShape');

const handlesClassifierWatchers = ({
  state,
  browser,
  logger,
  onObjectClassified
}) => ({
  handleClassifierWatchers(x, y) {
    logger.verbose(`Handling click / simple classification at x: ${x}, y: ${y}`);

    const { watcherData, settings: { simple: settings } } = state;
    const { classifier, recognizedClass, metadata } = settings;
    const { watchers } = watcherData.classifiers;

    watchers.forEach((w, i) => {
      const point = { x, y };

      if (watcherData.paused && watcherData.paused.includes(w.id)) {
        return;
      }

      if (getWatcherName(w) === classifier && pointInShape(point, getWatcherShape(w))) {
        logger.verbose('Point inside watcher area, calling onSimpleClassifier in the browser window');
        browser.webContents.executeJavaScript(onObjectClassified(w.id || i, recognizedClass, metadata));
      }
    });
  }
});

exports.handlesClassifierWatchers = handlesClassifierWatchers;
