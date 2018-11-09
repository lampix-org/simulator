const safeJsonParse = (string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    return null;
  }
};

exports.safeJsonParse = safeJsonParse;
