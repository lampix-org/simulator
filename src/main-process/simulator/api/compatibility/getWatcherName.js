const get = require('lodash.get');

const getWatcherName = (w) => {
  if (w.classifier) {
    return w.classifier;
  }

  const neuralNetworkName = get(w, 'params.neural_network_name', '');
  return `${w.name}${neuralNetworkName ? ` / ${neuralNetworkName}` : ''}`;
};

exports.getWatcherName = getWatcherName;
