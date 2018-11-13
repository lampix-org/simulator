const { parseIfString } = require('../../../utils/parseIfString');
const { response } = require('../response');
const { respond } = require('../respond');

const updatesWatcherShape = (state, browser) => ({
  updateWatcherShape(requestJson) {
    const {
      watcherData: { watchers }
    } = state;

    const req = parseIfString(requestJson);
    const { watcherId, shape } = req.data;

    // This is a naive implementation that can lead to unwanted results
    // TODO: Check shape integrity
    watchers[watcherId].shape = Object.assign(watchers[watcherId].shape, shape);

    const res = response(req.request_id, null);
    respond(browser, req, res);
  }
});

exports.updatesWatcherShape = updatesWatcherShape;
