# ccxt-task
Using CCXT public API and creating a backend service.

# Task Overview:
Step 0 - Create a new branch: eng/public-API-bittrex
Step 1 - Pull in external data from an exchange "bittrex"- Data: Coin prices.
https://www.npmjs.com/package/ccxt

Step 2 - save it in database (Design the DB schema your self) - Use MySQL.
https://www.npmjs.com/package/mysql

Step 3 - Use: https://www.npmjs.com/package/node-schedule to have this data pulled every 5 minutes and saved in the DB.
- Database table: bittrex
column 1 - String - coinpair
column 2 - float - price
column 3 - Date - last updated date


Step 4 - Develop APIs using Node.js for fetching the data from the Database.

- Exchange: bittrex
- APIs: 
A - GET a specific coin information :
Input: GET /coin-price?pair=USD-BTC
Output: {
"coin":"USD-BTC",
"value": 50.5
} 


B - GET all coins from an exchange :  
Input: GET /exchange-info?name=bittrex
Output: {
            "coins": [
            {
                "coin":"USD-BTC",
                    "value": 5700
            },
            {
                "coin":"USD-ETH",
                "value": 234
            }, 
            {
                "coin":"USD-LTC",
                "value": 50.5
            }]
        } 
Step 5 - Create a Merge request

