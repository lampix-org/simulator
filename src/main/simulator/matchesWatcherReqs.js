const get = require('lodash.get');

const matchesWatcherReqs = (w, selectedName) => {
  let req = w.name;
  const nnName = get(w, 'params.neural_network_name', '');

  if (nnName) {
    req = `${req} / ${nnName}`;
  }

  return req === selectedName;
};

exports.matchesWatcherReqs = matchesWatcherReqs;
