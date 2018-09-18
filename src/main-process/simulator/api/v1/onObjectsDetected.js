const onObjectsDetected = (watcherId, detectedObjects) =>
  `onObjectsDetected(${watcherId}, ${JSON.stringify(detectedObjects)})`;

exports.onObjectsDetected = onObjectsDetected;
