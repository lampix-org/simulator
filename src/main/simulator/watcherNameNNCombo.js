const get = require('lodash.get');

const watcherNameNNCombo = (w) => {
  let combo = w.name;
  const nnName = get(w, 'params.neural_network_name', '');

  if (nnName) {
    combo = `${combo} / ${nnName}`;
  }

  return combo;
};

exports.watcherNameNNCombo = watcherNameNNCombo;
