const { parseIfString } = require('../../../../utils/parseIfString');

const setsMovementWatchers = (state) => ({
  setMovementWatchers(data = []) {
    const { watcherData } = state;

    watcherData.movement.watchers = parseIfString(data);
  }
});

exports.setsMovementWatchers = setsMovementWatchers;
