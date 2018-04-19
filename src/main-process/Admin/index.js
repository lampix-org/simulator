const { Admin } = require('./Admin');
const { createAdminBrowser } = require('./createAdminBrowser');

exports.admin = new Admin();
exports.createAdminBrowser = createAdminBrowser;
