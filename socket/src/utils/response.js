function jsonResponse(ok, data = null, error = null) {
    return { ok, data, error };
  }
  
  module.exports = { jsonResponse };
  