const express = require('express');
const router = express.Router();
const API = require('../api');

router
	.get('/coin-price', async (req, res, next) => {
		const symbol = req.query.pair.replace('-', '/');
		//Todo add limit and skip for pagination
		const data = await API.getMarketData(symbol, 'coin');
		return res.json({status:'Ok', info:data});
	})
	.get('/exchange-info', async (req, res, next) => {
		const symbol = req.query.name;
		const exchangeData = await API.getMarketData(symbol);
		//Todo add limit and skip for pagination
		const marketData = exchangeData.map((exchangedata) => {
			return {
				coin: exchangedata.coinPair.replace('/', '-'),
				exchange: exchangedata.exchange,
				value: exchangedata.price,
				updated: exchangedata.updatedAt,
				metaData: exchangedata.metaData
			};
		});

		return res.json({status:'Ok', info:marketData});
	});
    
module.exports = router;