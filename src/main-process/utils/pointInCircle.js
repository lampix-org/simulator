const { distance } = require('./distance');

const pointInCircle = (point, cx, cy, r) => distance(point.x, point.y, cx, cy) < r;

exports.pointInCircle = pointInCircle;
