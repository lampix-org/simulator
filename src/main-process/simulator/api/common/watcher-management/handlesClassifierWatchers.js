const { getWatcherName } = require('../../compatibility/getWatcherName');
const { getWatcherShape } = require('../../compatibility/getWatcherShape');
const { pointInShape } = require('../../../../utils/pointInShape');

const handlesClassifierWatchers = ({
  state,
  browser,
  logger,
  onClassification
}) => ({
  handleClassifierWatchers(x, y) {
    logger.verbose(`Handling click / simple classification at x: ${x}, y: ${y}`);

    const { watcherData, settings: { simple: settings } } = state;
    const { classifier, recognizedClass, metadata } = settings;
    const { watchers } = watcherData.classifiers;

    watchers.forEach((watcher, i) => {
      const point = { x, y };

      if (getWatcherName(watcher) === classifier && pointInShape(point, getWatcherShape(watcher))) {
        logger.verbose('Point inside watcher area, calling onSimpleClassifier in the browser window');
        browser.webContents.executeJavaScript(onClassification(i, recognizedClass, metadata));
      }
    });
  }
});

exports.handlesClassifierWatchers = handlesClassifierWatchers;
