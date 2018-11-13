const response = (requestId, error = null, data = null) => ({
  requestId,
  error,
  data
});

exports.response = response;
