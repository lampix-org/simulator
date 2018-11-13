const { parseIfString } = require('../../../utils/parseIfString');
const { response } = require('../response');
const { respond } = require('../respond');

const removesWatchers = (state, browser) => ({
  removeWatchers(requestJson) {
    const {
      watcherData: { watchers }
    } = state;

    const req = parseIfString(requestJson);

    // Notify of each watcher removal separately
    // This simulates device reality as things may take time on that end
    req.data.watcher_ids.forEach((id) => {
      delete watchers[id];
    });

    const res = response(req.request_id, null, {
      watcher_ids: req.data.watcher_ids
    });

    respond(browser, req, res);
  }
});

exports.removesWatchers = removesWatchers;
