const { fetchWantedList, fetchPersonById } = require('../services/wanted.service');
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
