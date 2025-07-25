const { fetchWantedList } = require('../services/wanted.service');

async function getWantedList(req, res) {
  try {
    const { page } = req.query;
    const data = await fetchWantedList({ page });
    res.json({ success: true, data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { getWantedList };
