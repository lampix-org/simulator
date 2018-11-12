const respond = (browser, req, res) => {
  browser.webContents
    .executeJavaScript(`${req.callback}(${JSON.stringify(res)})`);
};

exports.respond = respond;
