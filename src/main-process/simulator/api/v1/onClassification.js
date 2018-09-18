const onClassificationCall = (watcherId, recognizedClass, metadata) =>
  `onClassification(${watcherId}, '${recognizedClass}', '${metadata}')`;

exports.onClassificationCall = onClassificationCall;
