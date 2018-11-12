const respond = (browser, req, res) => {
  if (browser.isDestroyed()) return;

  browser.webContents
    .executeJavaScript(`${req.callback}(${JSON.stringify(res)})`);
};

exports.respond = respond;
