const { distance } = require('./distance');

const pointInCircle = (p, c) => distance(p.x, p.y, c.x, c.y) < c.r;

exports.pointInCircle = pointInCircle;
