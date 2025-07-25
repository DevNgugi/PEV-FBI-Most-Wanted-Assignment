const { fetchWantedList } = require('../services/wanted.service');
const logger = require('../utils/logger');

async function getWantedList(req, res) {
  try {
    const { page } = req.query;
    const data = await fetchWantedList({ page });

    res.json({ success: true, data });
  } catch (err) {
    logger.error(`${req.ip} ${req.method} ${req.originalUrl} - Error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { getWantedList };
