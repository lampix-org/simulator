const hexagonOutline = (cx, cy, r = 10) => {
  const h = r / 2 * Math.sqrt(3);
  const pointPairs = [

    {
      x: cx + r,
      y: cy
    },
    {
      x: cx + r / 2,
      y: cy - h
    },
    {
      x: cx - r / 2,
      y: cy - h
    },
    {
      x: cx - r,
      y: cy
    },
    {
      x: cx - r / 2,
      y: cy + h
    },
    {
      x: cx + r / 2,
      y: cy + h
    }
  ];

  return pointPairs;
};

exports.hexagonOutline = hexagonOutline;
