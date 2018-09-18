const { getWatcherName } = require('../../compatibility/getWatcherName');
const { getWatcherShape } = require('../../compatibility/getWatcherShape');
const { paperOutline } = require('../../../../utils/paperOutline');
const { hexagonOutline } = require('../../../../utils/hexagonOutline');
const { somePointsInShape } = require('../../../../utils/somePointsInShape');

const handlesSegmenterWatchers = ({
  state,
  browser,
  logger,
  onObjectsLocated,
  onObjectsDetected
}) => ({
  handleSegmenterWatchers(x, y) {
    logger.verbose(`Handling right click / segmentation at x: ${x}, y: ${y}`);

    const { watcherData, settings: { position: settings } } = state;
    const { watchers } = watcherData.segmenters;

    let idCounter = 0;

    const {
      classifier,
      recognizedClass,
      metadata
    } = settings;

    // Simulated placed object size
    // TODO: should be user definable
    let polygon = [];

    const paperClassifier = classifier === 'paper';

    if (paperClassifier) {
      polygon = paperOutline(x, y);
    } else {
      polygon = hexagonOutline(x, y);
    }

    // Lampix creates IDs iteratively, and never repeats them
    const objectId = idCounter++;

    watchers.forEach((w, i) => {
      if (getWatcherName(w) !== classifier) {
        return;
      }

      const data = [];

      if (somePointsInShape(polygon, getWatcherShape(w))) {
        logger.info('Outline in watcher');

        /**
         * The preposition callback doesn't have the classTag attribute because
         * it's launched before the classification is complete
         */
        data.push({
          objectId,
          centerPoint: {
            posX: x,
            posY: y
          },
          outline: {
            points: polygon.map((p) => ({ posX: p.x, posY: p.y }))
          }
        });

        logger.info('Calling objects located callback (former onPrePosition)');
        browser.webContents.executeJavaScript(onObjectsLocated(w.id || i, data));

        // TODO: Make the time of this timeout configurable
        setTimeout(() => {
          data[data.length - 1].classTag = recognizedClass;

          logger.info('Calling objects detected callback (former onPosition)');
          browser.webContents.executeJavaScript(onObjectsDetected(w.id || i, data, metadata));
        }, 500);
      }
    });
  }
});

exports.handlesSegmenterWatchers = handlesSegmenterWatchers;
