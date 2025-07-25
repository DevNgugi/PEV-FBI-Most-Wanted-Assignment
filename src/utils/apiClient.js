// src/utils/axiosFBI.js
const axios = require('axios');

//We have to add headers (e.g Mozilla as below otherwise the FBI api is returning 403)
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