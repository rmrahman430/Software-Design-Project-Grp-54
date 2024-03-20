const express = require('express');
const router = express.Router();
const { submitFuelQuote, fetchFuelQuoteHistory } = require('../Controllers/FuelController');

router.post('/fuel-quote', submitFuelQuote);
router.get('/fuel-quote-history', fetchFuelQuoteHistory);

module.exports = router;
