const { pointInRectangle } = require('../../utils/pointInRectangle');
const { pointInCircle } = require('../../utils/pointInCircle');
const { pointInPolygon } = require('../../utils/pointInPolygon');

const { Shapes } = require('../../constants');

const handlers = {
  [Shapes.Rectangle]: pointInRectangle,
  [Shapes.Circle]: pointInCircle,
  [Shapes.Polygon]: pointInPolygon
};

const pointInShape = (point, shape) => handlers[shape.type](point, shape.data);

exports.pointInShape = pointInShape;
