const express = require('express');
const router = express.Router();
const cryptoController = require('../Controllers/crypto.controller');

// Route to fetch latest cryptocurrency stats (/stats?coin=bitcoin)
router.get('/stats', cryptoController.getCryptoStats);

// Route to fetch standard deviation of cryptocurrency prices (/deviation?coin=bitcoin)
router.get('/deviation', cryptoController.getCryptoPriceDeviation);

module.exports = router;
