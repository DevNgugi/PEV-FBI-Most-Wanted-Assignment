const createHttpClient = require('../utils/apiClient');
const redisHelper = require('../utils/redisHelper');
const logger = require('../utils/logger');

const API_URL = `${process.env.FBI_API_BASE_URL}/list`;

const api = createHttpClient(API_URL);
async function fetchWantedList({ page = 1 }) {
  const params = {
    page,
  };
  try {
    return redisHelper('list', params, async () => {
      const response = await api.get(API_URL, { params });
      return {
        total: response.data.total,
        page,
        results: WantedPersonDTO.fromApiArray(response.data.items),
      };
    });
  } catch (error) {
    logger.error(`FBI fetch failed: ${error.message}`);
  }
}

module.exports = { fetchWantedList };
