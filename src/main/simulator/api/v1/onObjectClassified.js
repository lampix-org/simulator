const onObjectClassified = (watcherId, recognizedClass, metadata) =>
  `onObjectClassified('${watcherId}', '${recognizedClass}', '${metadata}')`;

exports.onObjectClassified = onObjectClassified;
