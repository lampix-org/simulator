const { parseIfString } = require('../../../utils/parseIfString');
const { response } = require('../response');
const { respond } = require('../respond');

const pausesWatchers = (state, browser) => ({
  pauseWatchers(requestJson) {
    const { watcherData: { watchers } } = state;
    const req = parseIfString(requestJson);

    req.data.watcherIds.forEach((id) => {
      watchers[id].paused = true;
    });

    const res = response(req.requestId);
    respond(browser, req, res);
  }
});

exports.pausesWatchers = pausesWatchers;
