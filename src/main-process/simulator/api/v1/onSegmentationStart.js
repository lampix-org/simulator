const onSegmentationStart = (watcherId, locatedObjects) =>
  `onSegmentationStart(${watcherId}, ${JSON.stringify(locatedObjects)})`;

exports.onSegmentationStart = onSegmentationStart;
