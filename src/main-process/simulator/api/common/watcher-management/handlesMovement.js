const { hexagonOutline } = require('../../../../utils/hexagonOutline');
const { outlineInRectangle } = require('../../../../utils/outlineInRectangle');

const handlesMovement = ({
  state,
  browser
}) => ({
  handleMovement(mouseX, mouseY) {
    const { watcherData, settings } = state;
    const { watchers } = watcherData.movement;

    if (!settings.movementDetector || watchers.length === 0) {
      return;
    }

    const hexagon = hexagonOutline(mouseX, mouseY);

    // TODO: v1 - polygonInPolygon or pointInPolygon?
    watchers.forEach((rectangle, i) => {
      if (outlineInRectangle(hexagon, rectangle)) {
        browser.webContents.executeJavaScript(`onMovement(${i}, ${hexagon})`);
      }
    });
  }
});

exports.handlesMovement = handlesMovement;
