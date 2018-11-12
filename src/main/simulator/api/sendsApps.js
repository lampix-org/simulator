const { response } = require('./response');

const sendsApps = (
  state,
  browser,
  configStore
) => ({
  sendApps(requestJson) {
    const request = JSON.parse(requestJson);
    const numberOfDummyApps = configStore.get('simulator.appSwitcher.numberOfDummyApps');
    const dummyApps = Array.from({ length: numberOfDummyApps }, (v, i) => ({ name: `App #${i}` }));

    const res = response(request.requestId, null, {
      apps: dummyApps
    });

    browser.webContents
      .executeJavaScript(`${request.callback}(${JSON.stringify(res)})`);
  }
});

exports.sendsApps = sendsApps;
