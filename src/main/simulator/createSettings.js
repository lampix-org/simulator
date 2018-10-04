const { appSettings } = require('./app-settings');
const { onChange } = require('../utils/onChange');

const createSettings = ({
  version,
  url,
  store,
  defaults
}) => {
  const settings = appSettings({
    url,
    version,
    store,
    defaults
  });

  return onChange(settings, () => settings.save());
};

exports.createSettings = createSettings;
