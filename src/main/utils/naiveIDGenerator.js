const naiveIDGenerator = () => (+new Date() * Math.random()).toString(36).slice(0, 8);

exports.naiveIDGenerator = naiveIDGenerator;
