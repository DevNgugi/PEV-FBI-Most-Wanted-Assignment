const express = require('express');
const router = express.Router();
const { getWantedList } = require('../controllers/wanted.controller');

router.get('/', getWantedList); // GET /api/wanted

module.exports = router;