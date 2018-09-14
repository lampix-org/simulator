const { pointInRectangle } = require('./pointInRectangle');
const { pointInCircle } = require('./pointInCircle');
const { pointInPolygon } = require('./pointInPolygon');

const { Shapes } = require('../constants');

const handlers = {
  [Shapes.Rectangle]: pointInRectangle,
  [Shapes.Circle]: pointInCircle,
  [Shapes.Polygon]: pointInPolygon
};

const pointInShape = (point, shape) => handlers[shape.type](point, shape.data);

exports.pointInShape = pointInShape;
