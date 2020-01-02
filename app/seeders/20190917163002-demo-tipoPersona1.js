'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AD_Tipos_Personas', [{
      id: "680cd517-f6f6-4112-ad75-394af99f325a", 
      TCMunicipioId: "e1e058bf-e3c9-4f62-9004-903d216ee3b2",
      ADPersonaId: "3483aa37-62f8-4d1d-8a47-e4b94377f2d2",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Tipos_Personas', null, {});
  }
};