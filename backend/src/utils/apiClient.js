const axios = require('axios');
//We have to add headers (e.g Mozilla as below otherwise the FBI api is returning 403)
function createHttpClient(baseURL, customHeaders = {}) {
  const instance = axios.create({
    baseURL,
    timeout: parseInt(process.env.API_TIMEOUT || '10000', 10),
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
      ...customHeaders,
    },
  });


  return instance;
}

module.exports = createHttpClient;
