const { range } = require('./utils/range');

exports.DEFAULT_WINDOW_WIDTH = 1280;
exports.DEFAULT_WINDOW_HEIGHT = 800;
exports.DEFAULT_CLASSES = [
  ...range(0, 10),
  ...range(100, 110)
];
