const response = (requestId, error, data = null) => ({
  requestId,
  error,
  data
});

exports.response = response;
