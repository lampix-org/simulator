const { response } = require('./response');
const { respond } = require('./respond');

const sendsLampixInfo = (
  state,
  browser,
  configStore
) => ({
  sendLampixInfo(requestJson) {
    const req = JSON.parse(requestJson);

    const pix = configStore.get('pix');
    const info = {
      version: process.env.VERSION || '2.0.0',
      id: state.id,
      isSimulator: true,
      pix
    };

    const res = response(req.requestId, null, {
      info
    });

    respond(browser, req, res);
  }
});

exports.sendsLampixInfo = sendsLampixInfo;
