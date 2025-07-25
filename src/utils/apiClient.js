// src/utils/axiosFBI.js
const axios = require('axios');

function createHttpClient(baseURL, customHeaders = {}) {
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      ...customHeaders,
    },
  });
}

module.exports = createHttpClient;