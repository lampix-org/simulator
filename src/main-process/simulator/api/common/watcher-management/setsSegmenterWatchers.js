const { parseIfString } = require('../../../../utils/parseIfString');
const { pluckUniqFromList } = require('../../../../utils/pluckUniqFromList');

const setsSegmenterWatchers = (state, watcherNameProp) => ({
  setSegmenterWatchers(data = []) {
    const { watcherData } = state;

    const parsedData = parseIfString(data);
    watcherData.segmenters.names = pluckUniqFromList(watcherNameProp, parsedData);
    watcherData.segmenters.watchers = parsedData;
  }
});

exports.setsSegmenterWatchers = setsSegmenterWatchers;
