const CCXT = require('ccxt');
const MarketData = require('../models').MarketData;
const utils = require('../utils');

function _getExchanges() {
	// it can be configured in a way that gives more exchanges
	return ['gdax'];
}

async function _fetchMarketDataviaExchange(symbol) {
	const exchange = await CCXT[symbol]();
	await exchange.loadMarkets();
	let marketData = [];
	if (exchange.hasFetchTickers) {
		marketData = await exchange.fetchTickers();
	} else {
		for (market in exchange.markets) {
			if (!exchange.markets[market].darkpool) {
				let data = await exchange.fetchTicker(market);
				marketData.push(data);
				//delay so the API won't block the IP
				await new Promise (resolve => setTimeout (resolve, 1000));
			}
		}
	}
	return marketData;
}

async function getMarketData (symbol, type = 'exchange') {
	let marketData;
	let query = {};
	switch (type) {
		case 'coin':
			query.coinPair = symbol;
			break;
		case 'exchange':
			query.exchange = symbol;
			break;
	}
	const dbMarketData = await MarketData.findAll({where: query});
	marketData = dbMarketData.map(model => {
		return model.dataValues;
	});
	return marketData;
}

async function fetchLatestData () {
	const exchanges = _getExchanges();

	for (let i =0; i < exchanges.length;i++) {
		const exchangeData = await _fetchMarketDataviaExchange(exchanges[i]);
		const marketData = exchangeData.map((exchangedata) => {
			return {
				coinPair: exchangedata.symbol,
				exchange: exchanges[i],
				price: exchangedata.open,
				metaData: exchangedata
			};
		});

		for (let i =0; i < marketData.length;i++) {
			
			let condition = {
				exchange: exchanges[i], 
				coinPair: marketData[i].symbol
			};
			
			utils.updateOrCreate(MarketData, condition, marketData[i]);
		}
	}
}

const API = {
	getMarketData
};

module.exports = API;