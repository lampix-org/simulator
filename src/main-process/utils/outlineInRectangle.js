const { pointInRectangle } = require('./pointInRectangle');

const outlineInRectangle = (outline, rectangle) =>
  outline.every((point) => pointInRectangle(rectangle, point[0], point[1]));

exports.outlineInRectangle = outlineInRectangle;
