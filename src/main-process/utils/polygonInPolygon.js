const { lineByLineIterable } = require('./lineByLineIterable');
const { pointInPolygon } = require('./pointInPolygon');

const linesIntersect = () => {};

const polygonInPolygon = (polygon1, polygon2) => {
  for (const p1Line of lineByLineIterable(polygon1)) {
    for (const p2Line of lineByLineIterable(polygon2)) {
      if (linesIntersect(p1Line, p2Line)) {
        return false;
      }
    }
  }

  return pointInPolygon(polygon1[0], polygon2);
};

exports.polygonInPolygon = polygonInPolygon;
