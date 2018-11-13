const { parseIfString } = require('../../utils/parseIfString');
const { response } = require('./response');
const { respond } = require('./respond');

const transformsCoordinates = (
  browser,
  configStore
) => ({
  transformCoordinates(requestJson) {
    const req = parseIfString(requestJson);
    const scaleFactor = configStore.get('simulator.coordinateConversion.scaleFactor');

    const body = req.data.rectangles.map((w) => {
      const wClone = { ...w };
      wClone.posX *= scaleFactor;
      wClone.posY *= scaleFactor;
      wClone.width *= scaleFactor;
      wClone.height *= scaleFactor;

      return wClone;
    });

    const res = response(req.requestId, null, {
      rectangles: body
    });

    respond(browser, req, res);
  }
});

exports.transformsCoordinates = transformsCoordinates;
