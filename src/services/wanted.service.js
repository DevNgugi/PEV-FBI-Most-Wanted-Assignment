const createHttpClient = require('../utils/apiClient');

const FBI_API_URL =  `${process.env.FBI_WANTED_API_BASE}/list`;
const api = createHttpClient(FBI_API_URL);
async function fetchWantedList({ page = 1 }) {
  const params = {
    page
  };

  const response = await api.get(FBI_API_URL, { params });
  return response.data;
  
}

module.exports = { fetchWantedList };