const { parseIfString } = require('../../../utils/parseIfString');
const { getWatcherName } = require('../compatibility/getWatcherName');

const removesWatchers = (state) => ({
  removeWatchers(watcherIds = []) {
    const { watcherData: { segmenters } } = state;

    const parsedData = parseIfString(watcherIds);
    segmenters.watchers = segmenters.watchers.filter((w) => !parsedData.includes(w.id));
    segmenters.names = [...new Set(segmenters.watchers.map((w) => getWatcherName(w)))];
  }
});

exports.removesWatchers = removesWatchers;
