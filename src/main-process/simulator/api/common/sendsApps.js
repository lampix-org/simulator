const sendsApps = (
  state,
  browser,
  configStore
) => ({
  sendApps() {
    const numberOfDummyApps = configStore.get('simulator.appSwitcher.numberOfDummyApps');
    const dummyApps = Array.from({ length: numberOfDummyApps }, (v, i) => ({ name: `App #${i}` }));

    browser.webContents
      .executeJavaScript(`onGetApps(${JSON.stringify(dummyApps)})`);
  }
});

exports.sendsApps = sendsApps;
