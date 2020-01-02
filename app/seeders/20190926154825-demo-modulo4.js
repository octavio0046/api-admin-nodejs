'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Modulos', [{
      id: "c3f0e714-392c-4d3f-bbae-49e2876b0605", 
      Nombre: "Work",
      Icono: "icon-grid",
      Orden: 4,
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Modulos', null, {});
  }
};