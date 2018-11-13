const { parseIfString } = require('../../../utils/parseIfString');
const { response } = require('../response');
const { respond } = require('../respond');

const resumesWatchers = (state, browser) => ({
  resumeWatchers(requestJson) {
    const { watcherData: { watchers } } = state;
    const req = parseIfString(requestJson);

    req.data.watcher_ids.forEach((id) => {
      watchers[id].paused = false;
    });

    const res = response(req.request_id);
    respond(browser, req, res);
  }
});

exports.resumesWatchers = resumesWatchers;
