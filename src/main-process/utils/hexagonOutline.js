const hexagonOutline = (cx, cy, r = 10) => {
  const h = r / 2 * Math.sqrt(3);
  const pointPairs = [
    [cx + r, cy],
    [cx + r / 2, cy - h],
    [cx - r / 2, cy - h],
    [cx - r, cy],
    [cx - r / 2, cy + h],
    [cx + r / 2, cy + h]
  ];

  return pointPairs;
};

exports.hexagonOutline = hexagonOutline;
