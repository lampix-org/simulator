const onObjectsLocated = (watcherId, locatedObjects) =>
  `onObjectsLocated(${watcherId}, ${JSON.stringify(locatedObjects)})`;

exports.onObjectsLocated = onObjectsLocated;
