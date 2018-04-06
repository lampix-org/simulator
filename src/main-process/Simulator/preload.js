const { remote } = require('electron');

const { Simulator } = remote.require('../Simulator');
const { appSettings } = remote.require('../AppSettings');

const simulator = new Simulator();

window._lampix_internal = {
  registerMovement: (rectangles) => {

  }
};
