const axios = require('axios');
const axiosRetry = require('axios-retry').default;

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

  axiosRetry(instance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.code === 'ECONNABORTED' || // timeout
        (error.response && error.response.status >= 500)
      );
    },
    onRetry: (retryCount, error, requestConfig) => {
      console.warn(`[Retry #${retryCount}] ${requestConfig.method.toUpperCase()} ${requestConfig.url}`);
    },
  });

  return instance;
}

module.exports = createHttpClient;
