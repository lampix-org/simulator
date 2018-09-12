const { distance } = require('./distance');

const polygonInCircle = (polygon, circle) => {
  const { cx, cy, r } = circle;

  for (const point of polygon) {
    const d = distance(point.x, point.y, cx, cy);

    if (d > r) {
      return false;
    }
  }

  return true;
};

exports.polygonInCircle = polygonInCircle;
