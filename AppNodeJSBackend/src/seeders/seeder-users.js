'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'chin.69.dev@gmail.com',
      passWord: 'chin2002',
      firstName: 'Tẩn Tấn',
      lastName: 'Chín',
      address: 'Hà Nội',
      gender: 1,
      roleId: "R1",
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
