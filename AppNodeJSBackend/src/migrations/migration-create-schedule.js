'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schedule', {
    
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      currentNumber: {
        type: Sequelize.INTEGER
      },

      maxNumber: {
        type: Sequelize.INTEGER
      },

      date: {
        type: Sequelize.DATE
      },

      timeType: {
        type: Sequelize.STRING
      },

      doctorId: {
        type: Sequelize.INTEGER
      },

      createAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updateAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schedule');
  }
};