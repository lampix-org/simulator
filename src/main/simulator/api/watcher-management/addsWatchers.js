const { parseIfString } = require('../../../utils/parseIfString');
const { response } = require('../response');
const { respond } = require('../respond');

const addsWatchers = (state, browser) => ({
  addWatchers: (requestJson) => {
    const {
      watcherData: { watchers }
    } = state;

    const req = parseIfString(requestJson);

    req.data.watchers.forEach((w) => {
      watchers[w.id] = w;
    });

    const res = response(req.request_id, null, {
      watcher_ids: req.data.watchers.map((w) => w.id)
    });

    respond(browser, req, res);
  }
});

exports.addsWatchers = addsWatchers;
