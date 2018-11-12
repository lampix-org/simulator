const { response } = require('./response');

const sendsLampixInfo = (
  state,
  browser,
  configStore
) => ({
  sendLampixInfo(requestJson) {
    const request = JSON.parse(requestJson);

    const pix = configStore.get('pix');
    const info = {
      version: process.env.VERSION || '2.0.0',
      id: state.id,
      isSimulator: true,
      pix
    };

    const res = response(request.requestId, null, {
      info
    });

    browser.webContents
      .executeJavaScript(`${request.callback}(${JSON.stringify(res)})`);
  }
});

exports.sendsLampixInfo = sendsLampixInfo;
