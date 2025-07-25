const express = require('express');
const router = express.Router();
const { getWantedList, getWantedDetail } = require('../controllers/wanted.controller');

router.get('/', getWantedList);
router.get('/:id', getWantedDetail);

module.exports = router;
