const { Router } = require('express');
const {
  getAllCryptoPrices,
} = require('../controllers/cryptoPricesController');

const router = Router();

router.get('/', getAllCryptoPrices);

module.exports = router;