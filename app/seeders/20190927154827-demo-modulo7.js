'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Modulos', [{
      id: "8b0ac698-1583-44da-b656-1eabdb7217de", 
      Nombre: "Reportes",
      Icono: "icon-grid",
      Orden: 7,
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Modulos', null, {});
  }
};