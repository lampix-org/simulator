const { appSettings } = require('./app-settings');
const { onChange } = require('../utils/onChange');

const createSettings = ({
  url,
  store,
  defaults
}) => {
  const settings = appSettings({
    url,
    store,
    defaults
  });

  return onChange(settings.data, () => settings.save(settings.data));
};

exports.createSettings = createSettings;
