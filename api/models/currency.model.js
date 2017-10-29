const connection = require('./db');

module.exports = {
  getCoinPrice: coin => new Promise(((resolve, reject) => {
    connection.querySql(`SELECT * FROM marketdata WHERE coin='${coin}'`)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  })),

  getCoinByExchange: exchange => new Promise(((resolve, reject) => {
    connection.querySql(`SELECT coin,value FROM marketdata WHERE exchange='${exchange}'`)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  })),

  addOrUpdateCurrency: exchangeData =>
    // fix for converting promise to js object
    new Promise(((resolve, reject) => {
      if (exchangeData instanceof Promise) {
        exchangeData.then(exchangeD => {
          exchangeData = exchangeD; // eslint-disable-line
        });
      }
      connection.querySql(`SELECT id FROM marketdata WHERE exchange='${exchangeData.exchange}' AND coin='${exchangeData.coin}'`)
        .then(data => {
          if (data.length) {
            return connection.querySql(`UPDATE marketdata set value='${exchangeData.price}', updated='${exchangeData.updated}' WHERE id=${data[0].id}`);
          }
          const query = `INSERT INTO marketdata(coin, exchange, value, updated) VALUES ('${exchangeData.coin}','${exchangeData.exchange}','${exchangeData.price}','${exchangeData.updated}')`;
          // console.log(exchangeData.coin);
          return connection.querySql(query);
        })
        .then(data => {
          resolve(data);
        })
        .catch(e => {
          reject(e);
        });
    }))
  ,
};
