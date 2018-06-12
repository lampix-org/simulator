const paperOutline = (cx, cy, width = 160, height = 200) => [
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
];

exports.paperOutline = paperOutline;
