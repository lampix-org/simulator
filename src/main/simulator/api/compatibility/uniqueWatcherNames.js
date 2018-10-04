const { getWatcherName } = require('./getWatcherName');

exports.uniqueWatcherNames = (list) => [...new Set(list.map(getWatcherName))];
