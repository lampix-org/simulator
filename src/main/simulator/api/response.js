const response = (requestId, error = null, data = null) => ({
  request_id: requestId,
  error,
  data
});

exports.response = response;
