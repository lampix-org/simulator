const mapPointPairs = (pairs) => pairs.map((pair) => ({
  posX: pair[0],
  posY: pair[1]
}));

module.exports = mapPointPairs;
