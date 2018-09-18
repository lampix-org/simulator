const onObjectsClassified = (watcherId, recognizedClass, metadata) =>
  `onObjectsClassified('${watcherId}', '${recognizedClass}', '${metadata}')`;

exports.onObjectsClassified = onObjectsClassified;
