const { polygonInRectangle } = require('../../utils/polygonInRectangle');
const { polygonInCircle } = require('../../utils/polygonInCircle');
const { polygonInPolygon } = require('../../utils/polygonInPolygon');

const { Shapes } = require('../../constants');

const handlers = {
  [Shapes.Rectangle]: polygonInRectangle,
  [Shapes.Circle]: polygonInCircle,
  [Shapes.Polygon]: polygonInPolygon
};

const polygonInShape = (polygon, shape) => handlers[shape.type](polygon, shape.data);

exports.polygonInShape = polygonInShape;
