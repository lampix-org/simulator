const onObjectsClassified = (watcherId, detectedObjects) =>
  `onObjectsClassified('${watcherId}', ${JSON.stringify(detectedObjects)})`;

exports.onObjectsClassified = onObjectsClassified;
