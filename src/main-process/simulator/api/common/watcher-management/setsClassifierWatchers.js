const { parseIfString } = require('../../../../utils/parseIfString');
const { pluckUniqFromList } = require('../../../../utils/pluckUniqFromList');

const setsClassifierWatchers = (state, watcherNameProp) => ({
  setClassifierWatchers(data = []) {
    const { watcherData } = state;

    const parsedData = parseIfString(data);
    watcherData.classifiers.names = pluckUniqFromList(watcherNameProp, parsedData);
    watcherData.classifiers.watchers = parsedData;
  }
});

exports.setsClassifierWatchers = setsClassifierWatchers;
