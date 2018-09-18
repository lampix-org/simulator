const onSegmentationEnd = (watcherId, detectedObjects) =>
  `onSegmentationEnd(${watcherId}, ${JSON.stringify(detectedObjects)})`;

exports.onSegmentationEnd = onSegmentationEnd;
