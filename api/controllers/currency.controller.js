const logger = require('../helpers/logger');
const ccxt = require('ccxt');
const moment = require('moment');
const config = require('config');
const currencyModel = require('../models/currency.model');
const resGenerator = require('../helpers/resposeHelper');

async function getMarketData(exchangeName) {
  try {
    // get exchange data from ccxt
    const exchangeData = await ccxt[exchangeName]();
    await exchangeData.loadMarkets();
    let marketData = [];
    // if exchange data already has tickers
    if (exchangeData.hasFetchTickers) {
      marketData = await exchangeData.fetchTickers();
    } else {
      // load tickers for each market
      Object.keys(exchangeData.markets).forEach(async market => {
        if (!exchangeData.markets[market].darkpool) {
          const data = await exchangeData.fetchTicker(market);
          marketData.push(data);
          // timeout for 1 second as else it will hit rate limit
          await new Promise(resolve => setTimeout(resolve, 1000)); //eslint-disable-line
        }
      });
    }
    return marketData;
  } catch (e) {
    logger.log(e);
    return [];
  }
}

module.exports = {
  getCoinPrice: (req, res) => {
    const coin = req.query.pair;
    if (coin) {
      currencyModel.getCoinPrice(coin)
        .then(coinInfo => {
          if (!coinInfo.length) {
            throw new Error(1001);
          }
          res.status(200).json(resGenerator.generateSuccessRes(coinInfo));
        })
        .catch(e => {
          res.status(400).json(resGenerator.generateErrorRes(e));
        });
    } else {
      res.status(400).json(resGenerator.generateErrorRes(new Error(1003)));
    }
  },

  getCoinByExchange: (req, res) => {
    const exchange = req.query.name;
    if (exchange) {
      currencyModel.getCoinByExchange(exchange)
        .then(coinInfoByExchange => {
          if (!coinInfoByExchange.length) {
            throw new Error(1002);
          }
          res.status(200).json(resGenerator.generateSuccessRes(coinInfoByExchange));
        })
        .catch(e => {
          res.status(400).json(resGenerator.generateErrorRes(e));
        });
    } else {
      res.status(400).json(resGenerator.generateErrorRes(new Error(1004)));
    }
  },

  getDataFromWeb: () => {
    const exchanges = config.get('exchanges');
    console.log(exchanges);
    exchanges.forEach(exchange => {
      getMarketData(exchange)
        .then(exchangeDataSet => {
          let formattedData = [];
          if (Array.isArray(exchangeDataSet)) {
            formattedData = exchangeDataSet.filter(exchangeData => {
              if (exchangeData.bid && exchangeData.symbol) {
                return true;
              }
              return false;
            }).map(exchangeData => ({
              coin: (exchangeData.symbol || '').replace('/', '-'),
              exchange,
              price: exchangeData.bid,
              updated: moment(exchangeData.datetime || Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            }));
          } else {
            Object.keys(exchangeDataSet).forEach(eData => {
              const exchangeData = exchangeDataSet[eData];
              if (exchangeData.bid && exchangeData.symbol) {
                formattedData.push({
                  coin: (exchangeData.symbol || '').replace('/', '-'),
                  exchange,
                  price: exchangeData.bid,
                  updated: moment(exchangeData.datetime || Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                });
              }
            });
          }
          console.log(exchange, formattedData.length);
          formattedData.forEach(fData => {
            currencyModel.addOrUpdateCurrency(fData);
          });
        })
        .catch(e => {
          logger.log(e);
        });
      // console.log(exchange, exchangeDataSet);
    });
  },
};
