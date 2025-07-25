const createHttpClient = require('../utils/apiClient');
const redisHelper = require('../utils/redisHelper');
const logger = require('../utils/logger');
const WantedPersonDTO = require('../dtos/wantedPersonDTO');

const WANTED_API_URL = `${process.env.FBI_API_BASE_URL}/${process.env.WANTED_ENDPOINT}`;
const PERSON_API_URL = `${process.env.FBI_API_BASE_URL}/${process.env.PERSON_ENDPOINT}`;

const api = createHttpClient(WANTED_API_URL);
async function fetchWantedList({ page = 1 }) {
  const params = {
    page,
  };

  try {
    return redisHelper('list', params, async () => {
      const response = await api.get(WANTED_API_URL, { params });
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

async function fetchPersonById(id) {
  const params = { id };
  try {
    return redisHelper('puuid', params, async () => {
      const response = await api.get(`${PERSON_API_URL}/${id}`);
      return WantedPersonDTO.fromApi(response.data);
    });
  } catch (error) {
    logger.error(`FBI fetch failed: ${error.message}`);
  }
}

module.exports = { fetchWantedList, fetchPersonById };
