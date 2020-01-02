'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Carreras', [{
      id: "83fd9431-5f27-4d3a-9e7f-55d3558f1832", 
      Nombre: "Gastronomia",
      Descripcion: "hacer comida",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Carreras', null, {});
  }
};