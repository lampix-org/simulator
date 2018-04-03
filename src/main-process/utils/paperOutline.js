const paperOutline = (cx, cy, width = 160, height = 200) => ({
  points: [
    {
      posX: cx + width,
      posY: cy + height
    },
    {
      posX: cx - width,
      posY: cy + height
    },
    {
      posX: cx - width,
      posY: cy - height
    },
    {
      posX: cx + width,
      posY: cy - height
    }
  ]
});

module.exports = paperOutline;
