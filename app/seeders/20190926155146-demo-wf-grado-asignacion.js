'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Grados_Asignaciones', [{
      id: "3c9239bd-e4ee-495b-a5f6-2f55d84b72e8", 
      Nombre: "Asignacion-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      WFSeccioneId: "3c9239bd-e4ee-495b-a5f6-2f55d84b72e8",
      WFCarreraId: "83fd9431-5f27-4d3a-9e7f-55d3558f1832",
      WFJornadaId: "8b438c8b-0a12-43b3-9bc3-6eadf67b341e",
      WFGradoId: "5e99b302-523f-4af4-bc55-7c8afcf2dde8"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Grados_Asignaciones', null, {});
  }
};