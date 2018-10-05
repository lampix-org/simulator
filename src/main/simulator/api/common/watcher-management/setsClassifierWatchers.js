const { parseIfString } = require('../../../../utils/parseIfString');
const { getWatcherName } = require('../../compatibility/getWatcherName');

const setsClassifierWatchers = (state) => ({
  setClassifierWatchers(data = []) {
    const { watcherData } = state;

    const parsedData = parseIfString(data);
    watcherData.classifiers.names = [...new Set(parsedData.map((w) => getWatcherName(w)))];
    watcherData.classifiers.watchers = parsedData;
  }
});

exports.setsClassifierWatchers = setsClassifierWatchers;
