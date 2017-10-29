const ccxt = require('ccxt');
const moment = require('moment');
const connection = require('../../models/db');
const currencyModel = require('../../models/currency');
const resGenerator = require('../../rescodes/index');
const config = require('../../../config');

async function getMarketData(exchangeName) {
  try {
    const exchangeData = await ccxt[exchangeName]();
    await exchangeData.loadMarkets();
    let marketData = [];
    if (exchangeData.hasFetchTickers) {
      marketData = await exchangeData.fetchTickers();
    } else {
      for (market in exchangeData.markets) {
        if (!exchangeData.markets[market].darkpool) {
          let data = await exchangeData.fetchTicker(market);
          marketData.push(data);
          await new Promise (resolve => setTimeout (resolve, 1000));
        }
      }
    }
    return marketData;
  } catch (e) {
    console.log(e);
    return [];
  }
}

module.exports = {
  getCoinPrice: async (req, res) => {
    try {
      const coin = req.query.pair;
      if (coin) {
        const coinInfo = await currencyModel.getCoinPrice(coin);
        if (!coinInfo.length) {
          throw new Error(1001);
        }
        res.status(200).json(resGenerator.generateSuccessRes(coinInfo));
      } else {
        throw new Error(1003);
      }
    } catch (e) {
      res.status(200).json(resGenerator.generateErrorRes(e));
    }
  },

  getCoinByExchange: async (req, res) => {
    try {
      const exchange = req.query.name;
      if (exchange) {
        const coinInfoByExchange = await currencyModel.getCoinByExchange(exchange);
        if (!coinInfoByExchange.length) {
          throw new Error(1002);
        }
        res.status(200).json(resGenerator.generateSuccessRes(coinInfoByExchange));
      } else {
        throw new Error(1004);
      }
    } catch (e) {
      res.status(200).json(resGenerator.generateErrorRes(e));
    }
  },

  getDataFromWeb: async () => {
    const exchanges = config.exchanges;
    exchanges.forEach(async (exchange) => {
  		const exchangeDataSet = await getMarketData(exchange);
      // console.log(exchange, exchangeDataSet);
      let formattedData = []
      if (Array.isArray(exchangeDataSet)) {
        formattedData = exchangeDataSet.filter(exchangeData => {
          if (exchangeData.bid && exchangeData.symbol) {
            return true;
          } else {
            return false;
          }
        }).map(async (exchangeData) => {
    			return {
            coin: (exchangeData.symbol || '').replace('/', '-'),
            exchange: exchange,
            price: exchangeData.bid,
            updated: moment(exchangeData.datetime || Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    			};
    		});
  		} else {
  		  for (let exchangeData in exchangeDataSet) {
          exchangeData = exchangeDataSet[exchangeData];
          if (exchangeData.bid && exchangeData.symbol) {
            formattedData.push({
              coin: (exchangeData.symbol || '').replace('/', '-'),
              exchange: exchange,
              price: exchangeData.bid,
              updated: moment(exchangeData.datetime || Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            });
          }
  		  }
  		}
      console.log(exchange,formattedData.length);
      formattedData.forEach((fData) => {
          currencyModel.addOrUpdateCurrency(fData);
      })
      await new Promise (resolve => setTimeout (resolve, 5000));
  	});
  }
};
