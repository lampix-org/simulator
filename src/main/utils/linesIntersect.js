// https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

const onSegment = (p, q, r) => (
  q.x <= Math.min(p.x, r.x) &&
  q.x >= Math.min(p.x, r.x) &&
  q.y <= Math.max(p.y, r.y) &&
  q.y >= Math.min(p.y, r.y)
);

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
const orientation = (p, q, r) => {
  const value = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (value === 0) {
    return 0;
  }

  return value > 0 ? 1 : 2;
};

const linesIntersect = (line1, line2) => {
  const { p1, p2 } = line1;
  const { p1: p3, p2: p4 } = line2;

  const o1 = orientation(p1, p2, p3);
  const o2 = orientation(p1, p2, p4);
  const o3 = orientation(p3, p4, p1);
  const o4 = orientation(p3, p4, p2);

  let linesDoIntersect = false;
  // General case
  linesDoIntersect = o1 !== o2 && o3 !== o4;
  // Special cases
  // p1, p2, p3 colinear and p3 lies on segment [p1, p2]
  linesDoIntersect = linesDoIntersect || (o1 === 0 && onSegment(p1, p3, p2));
  // p1, p2, p4 are colinear and p4 lies on segment [p1, p2]
  linesDoIntersect = linesDoIntersect || (o2 === 0 && onSegment(p1, p4, p2));
  // p1, p3, p4 are colinear, and p1 lies on segment [p3, p4]
  linesDoIntersect = linesDoIntersect || (o3 === 0 && onSegment(p3, p1, p4));
  // p2, p3, p4 are colinear, and p2 lies on segment [p3, p4]
  linesDoIntersect = linesDoIntersect || (o4 === 0 && onSegment(p3, p2, p4));

  return linesDoIntersect;
};

exports.linesIntersect = linesIntersect;
