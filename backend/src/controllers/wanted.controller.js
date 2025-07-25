const { fetchWantedList, fetchPersonById } = require('../services/wanted.service');
const logger = require('../utils/logger');

async function getWantedList(req, res) {
  try {
    const { page, title, sex, race, field_offices, status, reward_min, reward_max } = req.query;

    const filters = {
      title,
      sex,
      race,
      field_offices,
      status,
      reward_min,
      reward_max,
    };

    // Remove undefined/null filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] == null || filters[key] === '') {
        delete filters[key];
      }
    });

    const data = await fetchWantedList({ page, filters });

    res.json({ success: true, data });
  } catch (err) {
    logger.error(`${req.ip} ${req.method} ${req.originalUrl} - Error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

async function getWantedDetail(req, res) {
  try {
    const { id } = req.params;

    const data = await fetchPersonById(id);

    if (!data) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.json({ success: true, data });
  } catch (err) {
    logger.error(`${req.ip} ${req.method} ${req.originalUrl} - Error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { getWantedList, getWantedDetail };
