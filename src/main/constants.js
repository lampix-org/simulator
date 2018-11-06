const { app } = require('electron');
const path = require('path');

const { range } = require('./utils/range');

exports.DEFAULT_WINDOW_WIDTH = 1280;
exports.DEFAULT_WINDOW_HEIGHT = 800;
exports.DEFAULT_CLASSES = [
  ...(range(0, 10)).map((n) => n.toString()),
  ...(range(100, 110)).map((n) => n.toString())
];

exports.Shapes = Object.freeze({
  Rectangle: 'rectangle',
  Circle: 'circle',
  Polygon: 'polygon'
});

const userDataPath = app.getPath('userData');
exports.WEBAPPS_PATH = path.join(userDataPath, 'webapps');
exports.WEBAPPS_DATA_PATH = path.join(userDataPath, 'webapps-data');
