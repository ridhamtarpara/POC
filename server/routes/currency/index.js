const express = require('express');
const currencyController = require('../../controllers/currency');

const router = express.Router();    // eslint-disable-line new-cap

router.route('/coin-price')
		.get(currencyController.getCoinPrice);

router.route('/exchange-info')
		.get(currencyController.getCoinByExchange);

		router.route('/info')
				.get(currencyController.getDataFromWeb);

module.exports = router;
