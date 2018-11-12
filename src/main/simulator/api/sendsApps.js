const { response } = require('./response');
const { respond } = require('./respond');

const sendsApps = (
  state,
  browser,
  configStore
) => ({
  sendApps(requestJson) {
    const req = JSON.parse(requestJson);
    const numberOfDummyApps = configStore.get('simulator.appSwitcher.numberOfDummyApps');
    const dummyApps = Array.from({ length: numberOfDummyApps }, (v, i) => ({ name: `App #${i}` }));

    const res = response(req.requestId, null, {
      apps: dummyApps
    });

    respond(browser, req, res);
  }
});

exports.sendsApps = sendsApps;
