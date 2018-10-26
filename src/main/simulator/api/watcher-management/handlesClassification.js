const { paperOutline } = require('../../../utils/paperOutline');
const { hexagonOutline } = require('../../../utils/hexagonOutline');
const { somePointsInShape } = require('../../../utils/somePointsInShape');

const handlesClassification = ({
  state,
  browser,
  logger,
  onObjectsLocated,
  onObjectsClassified
}) => ({
  handleClassification(x, y) {
    logger.verbose(`Handling click at x: ${x}, y: ${y}`);

    const { watcherData, settings } = state;
    const { watchers } = watcherData;

    let idCounter = 0;

    const {
      watcherName,
      recognizedClass,
      metadata
    } = settings;

    // Simulated placed object size
    // TODO: should be user definable
    let polygon = [];

    const paperClassifier = watcherName === 'paper';

    if (paperClassifier) {
      polygon = paperOutline(x, y);
    } else {
      polygon = hexagonOutline(x, y);
    }

    // Lampix creates IDs iteratively, and never repeats them
    const objectId = idCounter++;

    Object.keys(watchers).forEach((wKey, i) => {
      const w = watchers[wKey];

      if (w.paused || w.name !== watcherName) {
        return;
      }

      const data = [];

      if (somePointsInShape(polygon, w.shape)) {
        logger.info('Outline in watcher');

        /**
         * The onLocation callback doesn't have the classTag attribute because
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

        logger.info('Calling onObjectsLocated');
        browser.webContents.executeJavaScript(onObjectsLocated(w.id || i, data));

        // TODO: Make the time of this timeout configurable
        setTimeout(() => {
          data[data.length - 1].classTag = recognizedClass;

          logger.info('Calling onObjectsClassified');
          browser.webContents.executeJavaScript(onObjectsClassified(w.id || i, data, metadata));
        }, 0);
      }
    });
  }
});

exports.handlesClassification = handlesClassification;
