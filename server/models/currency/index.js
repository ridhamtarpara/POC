const connection = require('../../models/db');
const logger = require('../../winston');

module.exports = {
  // get coing price by name
  getCoinPrice: async (coin) => {
    try {
      const data = await connection.querySql(`SELECT * FROM marketdata WHERE coin='${coin}'`);
      return data;
    } catch (e) {
      logger.log(e)
      return [];
    }
  },

  // get coin info by exchange name
  getCoinByExchange: async (exchange) => {
    try {
      const data = await connection.querySql(`SELECT coin,value FROM marketdata WHERE exchange='${exchange}'`);
      return data;
    } catch (e) {
      logger.log(e);
      return [];
    }
  },

  // add or update exchange data
  addOrUpdateCurrency: async (exchangeData)  => {
    // fix for converting promise to js object
    if (exchangeData instanceof Promise) {
      exchangeData.then(exchangeD => {
        exchangeData = exchangeD;
      })
    }
    try {
      const data = await connection.querySql(`SELECT id FROM marketdata WHERE exchange='${exchangeData.exchange}' AND coin='${exchangeData.coin}'`);
      if (data.length) {
        // if data availble then update`
        const updateData = await connection.querySql(`UPDATE marketdata set value='${exchangeData.price}', updated='${exchangeData.updated}' WHERE id=${data[0].id}`);
      } else {
        // if data not availble then creat
        let query = `INSERT INTO marketdata(coin, exchange, value, updated) VALUES ('${exchangeData.coin}','${exchangeData.exchange}','${exchangeData.price}','${exchangeData.updated}')`;
        // console.log(exchangeData.coin);
        const createData = await connection.querySql(query);
      }
    } catch (e) {
      console.log(e, exchangeData);
      logger.log(e);
      return [];
    }
  }
};
