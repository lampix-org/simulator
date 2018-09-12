const { polygonInPolygon } = require('./polygonInPolygon');

const polygonInRectangle = (polygon, rectangle) => {
  const polygonFromRectangle = [
    {
      x: rectangle.posX,
      y: rectangle.posY
    },
    {
      x: rectangle.posX + rectangle.width,
      y: rectangle.posY
    },
    {
      x: rectangle.posX + rectangle.width,
      y: rectangle.posY + rectangle.height
    },
    {
      x: rectangle.posX,
      y: rectangle.posY + rectangle.height
    }
  ];

  return polygonInPolygon(polygon, polygonFromRectangle);
};

exports.polygonInRectangle = polygonInRectangle;
