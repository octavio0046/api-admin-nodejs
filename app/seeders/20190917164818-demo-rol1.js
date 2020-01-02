'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Roles', [{
      id: "12a33b7c-ebc3-4ad5-b4d1-230a01570664", 
      Nombre: "Super",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Roles', null, {});
  }
};