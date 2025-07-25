const createHttpClient = require('../utils/apiClient');
const redisHelper = require('../utils/redisHelper');

const API_URL =  `${process.env.FBI_API_BASE_URL}/list`;

const api = createHttpClient(API_URL);
async function fetchWantedList({ page = 1 }) {
  const params = {
    page
  };

   return redisHelper('list', params, async () => {
    const response =  await api.get(API_URL, { params });
    return response.data;
  });
  
}

module.exports = { fetchWantedList };