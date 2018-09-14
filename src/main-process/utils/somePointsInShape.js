const { pointInRectangle } = require('./pointInRectangle');
const { pointInCircle } = require('./pointInCircle');
const { pointInPolygon } = require('./pointInPolygon');

const { Shapes } = require('../constants');

const handlers = {
  [Shapes.Rectangle]: pointInRectangle,
  [Shapes.Circle]: pointInCircle,
  [Shapes.Polygon]: pointInPolygon
};

const somePointsInShape = (polygon, shape) => {
  for (const p of polygon) {
    if (handlers[shape.type](p, shape.data)) {
      return true;
    }
  }

  return false;
};

exports.somePointsInShape = somePointsInShape;
