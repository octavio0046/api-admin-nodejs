'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Roles', [{
      id: "ed1043cb-8924-4de1-a2b3-1368b950abf5", 
      Nombre: "Administrador",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Roles', null, {});
  }
};