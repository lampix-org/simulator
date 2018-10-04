const pointInRectangle = (p, r) =>
  (r.posX < p.x && p.x < r.posX + r.width) &&
  (r.posY < p.y && p.y < r.posY + r.height);

exports.pointInRectangle = pointInRectangle;
