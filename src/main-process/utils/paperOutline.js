const paperOutline = (cx, cy, width = 160, height = 200) => ({
  points: [
    [
      cx + width,
      cy + height
    ],
    [
      cx - width,
      cy + height
    ],
    [
      cx - width,
      cy - height
    ],
    [
      cx + width,
      cy - height
    ]
  ]
});

module.exports = paperOutline;
