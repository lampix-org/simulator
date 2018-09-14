const { Shapes } = require('../../../constants');

const getWatcherShape = (watcher) => watcher.shape || {
  type: Shapes.Rectangle,
  data: {
    posX: watcher.posX,
    posY: watcher.posY,
    width: watcher.width,
    height: watcher.height
  }
};

exports.getWatcherShape = getWatcherShape;
