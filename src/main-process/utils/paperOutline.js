const paperOutline = (cx, cy, width = 320, height = 400) => {
  const widthOffsetFromCenter = width / 2;
  const heightOffsetFromCenter = height / 2;

  return [
    [
      cx + widthOffsetFromCenter,
      cy + heightOffsetFromCenter
    ],
    [
      cx - widthOffsetFromCenter,
      cy + heightOffsetFromCenter
    ],
    [
      cx - widthOffsetFromCenter,
      cy - heightOffsetFromCenter
    ],
    [
      cx + widthOffsetFromCenter,
      cy - heightOffsetFromCenter
    ]
  ];
};

exports.paperOutline = paperOutline;
