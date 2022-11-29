'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Allcodes', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      keyMap: {
        type: Sequelize.STRING
      },

      type: {
        type: Sequelize.STRING
      },

      valueEN: {
        type: Sequelize.STRING
      },

      valueVI: {
        type: Sequelize.STRING
      },

      createAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updateAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Allcodes');
  }
};