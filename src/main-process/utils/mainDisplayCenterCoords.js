const { screen } = require('electron');

const {
  DEFAULT_WINDOW_WIDTH,
  DEFAULT_WINDOW_HEIGHT
} = require('../constants');

const { bounds } = screen.getPrimaryDisplay();

module.exports = (windowWidth = DEFAULT_WINDOW_WIDTH, windowHeight = DEFAULT_WINDOW_HEIGHT) => ({
  x: bounds.x + ((bounds.width - windowWidth) / 2),
  y: bounds.y + ((bounds.height - windowHeight) / 2)
});
