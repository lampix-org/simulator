const paperOutline = (cx, cy, width = 320, height = 400) => {
  const widthOffsetFromCenter = width / 2;
  const heightOffsetFromCenter = height / 2;

  return [
    {
      x: cx + widthOffsetFromCenter,
      y: cy + heightOffsetFromCenter
    },
    {
      x: cx - widthOffsetFromCenter,
      y: cy + heightOffsetFromCenter
    },
    {
      x: cx - widthOffsetFromCenter,
      y: cy - heightOffsetFromCenter
    },
    {
      x: cx + widthOffsetFromCenter,
      y: cy - heightOffsetFromCenter
    }
  ];
};

exports.paperOutline = paperOutline;
