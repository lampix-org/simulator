const { type } = require('../utils/type');

const parseIfString = (data) => {
  if (type(data) === 'String') {
    return JSON.parse(data);
  }

  return data;
};

exports.parseIfString = parseIfString;
