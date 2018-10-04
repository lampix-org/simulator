const { parseIfString } = require('../../../utils/parseIfString');

const transformsCoordinates = (
  browser,
  configStore
) => ({
  transformCoordinates(watchers = []) {
    const parsedData = parseIfString(watchers);
    const scaleFactor = configStore.get('simulator.coordinateConversion.scaleFactor');

    parsedData.forEach((w) => {
      w.posX *= scaleFactor;
      w.posY *= scaleFactor;
      w.width *= scaleFactor;
      w.height *= scaleFactor;
      w.type = w.type === 'camera' ? 'projector' : 'camera';
    });

    browser.webContents
      .executeJavaScript(`onTransformCoordinates(${JSON.stringify(parsedData)})`);
  }
});

exports.transformsCoordinates = transformsCoordinates;
