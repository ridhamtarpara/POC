'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return [
			queryInterface.addColumn('marketdata', 'metaData',{
				type: Sequelize.JSON
			})
		];
	},

	down: (queryInterface, Sequelize) => {
		return [
			queryInterface.removeColumn('marketdata', 'metaData')
		];
	}
};
