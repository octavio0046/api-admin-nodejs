'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Secciones', [{
      id: "3c9239bd-e4ee-495b-a5f6-2f55d84b72e8", 
      Nombre: "A",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Secciones', null, {});
  }
};