// TODO: Get version from somewhere
const sendsLampixInfo = (
  state,
  browser,
  configStore
) => ({
  sendLampixInfo() {
    const pix = configStore.get('pix');
    const info = {
      version: '0.1',
      id: state.id,
      isSimulator: true,
      pix
    };

    browser.webContents
      .executeJavaScript(`onLampixInfo(${JSON.stringify(info)})`);
  }
});

exports.sendsLampixInfo = sendsLampixInfo;
