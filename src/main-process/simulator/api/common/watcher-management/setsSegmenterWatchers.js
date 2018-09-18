const { parseIfString } = require('../../../../utils/parseIfString');
const { getWatcherName } = require('../../compatibility/getWatcherName');

const setsSegmenterWatchers = (state) => ({
  setSegmenterWatchers(data = []) {
    const { watcherData } = state;

    const parsedData = parseIfString(data);
    watcherData.segmenters.names = [...new Set(data.map((w) => getWatcherName(w)))];
    watcherData.segmenters.watchers = parsedData;
  }
});

exports.setsSegmenterWatchers = setsSegmenterWatchers;
