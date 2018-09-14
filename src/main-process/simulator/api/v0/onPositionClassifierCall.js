const onPositionClassifierCall = (i, data, metadata) =>
  `onPositionClassifier(${i}, ${JSON.stringify(data)}, '${metadata}')`;

exports.onPositionClassifierCall = onPositionClassifierCall;
