'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AD_Personas', [{
      id: "3483aa37-62f8-4d1d-8a47-e4b94377f2d2", 
      Nombres: "Rosendo",
      Apellidos: "Bravo",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Personas', null, {});
  }
};