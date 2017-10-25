module.exports = (sequelize, DataTypes) => {
	
	const marketDataAttributes = {
		exchange: DataTypes.STRING,
		price: DataTypes.FLOAT,
		coinPair: DataTypes.STRING,
		metaData: DataTypes.JSON
	};

	const marketDataOptions = {
		tableName: 'marketdata'
	};

	const MarketData = sequelize.define('MarketData', marketDataAttributes, marketDataOptions);
	
	return MarketData;
};