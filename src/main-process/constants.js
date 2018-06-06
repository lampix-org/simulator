const { range } = require('./utils/range');

exports.DEFAULT_WINDOW_WIDTH = 1280;
exports.DEFAULT_WINDOW_HEIGHT = 800;
exports.DEFAULT_CLASSES = [
  ...(range(0, 10)).map((n) => n.toString()),
  ...(range(100, 110)).map((n) => n.toString())
];
exports.MAIN_PROCESS_INFO_LOG_OBJ = {
  level: 'info',
  sentFrom: 'M'
};
exports.MAIN_PROCESS_ERROR_LOG_OBJ = {
  level: 'error',
  sentFrom: 'M'
};
exports.RENDERER_INFO_LOG_OBJ = {
  level: 'info',
  sentFrom: 'R'
};
exports.RENDERER_ERROR_LOG_OBJ = {
  level: 'error',
  sentFrom: 'R'
};

