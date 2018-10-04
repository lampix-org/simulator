const storeURLTemplate = (version, url) => `settings/${version}/${url}`;
const appSettings = ({
  version,
  url,
  store,
  defaults
}) => {
  const storeLocation = storeURLTemplate(version, url);
  let data = null;

  if (store.has(storeLocation)) {
    data = store.get(storeLocation);
  } else {
    data = defaults();
  }

  return Object.assign(
    {
      save() {
        store.set(storeLocation, data);
      }
    },
    data
  );
};

exports.appSettings = appSettings;
