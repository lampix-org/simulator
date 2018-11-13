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

    if (!watchers[watcherId]) {
      console.log('wow');
    }

    // This is a naive implementation that can lead to unwanted results
    // TODO: Check shape integrity
    watchers[watcherId].shape = Object.assign(watchers[watcherId].shape, shape);

    const res = response(req.requestId, null);
    respond(browser, req, res);
  }
});

exports.updatesWatcherShape = updatesWatcherShape;
