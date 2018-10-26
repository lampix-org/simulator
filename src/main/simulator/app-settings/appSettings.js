const storeURLTemplate = (url) => `settings/${url}`.replace(/\./g, '\\.');
const appSettings = ({
  url,
  store,
  defaults
}) => {
  const storeLocation = storeURLTemplate(url);
  let data = null;

  if (store.has(storeLocation)) {
    data = store.get(storeLocation);
  } else {
    data = defaults();
  }

  return {
    save(toSave) {
      store.set(storeLocation, toSave);
    },
    data
  };
};

exports.appSettings = appSettings;
