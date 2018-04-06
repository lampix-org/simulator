const { inRectangle } = require('./inRectangle');

const hexagonInRect = (hexagonPoints, rect) => hexagonPoints.every((point) => inRectangle(rect, point[0], point[1]));

exports.hexagonInRect = hexagonInRect;
