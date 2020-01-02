'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Horarios', [{
      id: "97640648-fa2f-45a7-97c0-4fb33b3e9d7c", 
      HorarioInicial: "8:00 am",
      HorarioFinal: "14:00 pm",
      Descripcion: "horario 1",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Horarios', null, {});
  }
};