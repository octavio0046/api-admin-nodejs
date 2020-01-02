'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Municipios', [{
      id: "e1e058bf-e3c9-4f62-9004-903d216ee3b2", 
      Nombre: "Asuncion",
      TCDepartamentoId: "75aca5ef-771a-455d-9a54-f439d013c906",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Municipios', null, {});
  }
};