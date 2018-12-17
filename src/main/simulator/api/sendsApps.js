const { response } = require('./response');
const { respond } = require('./respond');

const dummyPackageJson = (i) => ({
  name: `app-${i}`,
  version: `${i}.1.0`,
  displayName: `App #${i}`,
  author: {
    name: `X Dev ${i}`,
    email: `x${i}@dev.com`
  },
  description: 'Dummy app provided by the simulator',
  lampixConfig: {
    lampixVersion: '>= 2.1.0',
    showInAppSwitcher: true
  }
});

const sendsApps = (
  state,
  browser,
  configStore
) => ({
  sendApps(requestJson) {
    const req = JSON.parse(requestJson);
    const numberOfDummyApps = configStore.get('simulator.appSwitcher.numberOfDummyApps');
    const dummyApps = Array.from({ length: numberOfDummyApps }, (v, i) => ({
      name: `app-#${i}`,
      package_data: dummyPackageJson(i),
      is_local: i % 2 === 0
    }));

    const res = response(req.request_id, null, {
      apps: dummyApps
    });

    respond(browser, req, res);
  }
});

exports.sendsApps = sendsApps;
