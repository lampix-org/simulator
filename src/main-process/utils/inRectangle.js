const inRectangle = (rect, x, y) =>
  (rect.posX < x && x < rect.posX + rect.width) &&
  (rect.posY < y && y < rect.posY + rect.height);

module.exports = inRectangle;
