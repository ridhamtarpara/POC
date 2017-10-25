module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('marketdata', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			exchange: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.FLOAT
			},
			coinPair: {
				type: Sequelize.STRING
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('marketdata');
	}
};