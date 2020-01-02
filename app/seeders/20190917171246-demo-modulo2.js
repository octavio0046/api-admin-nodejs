'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Modulos', [{
      id: "f2b39426-347a-4d11-8e9e-4acd76caf191", 
      Nombre: "Administracion",
      Icono: "icon-grid",
      Orden: 2,
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Modulos', null, {});
  }
};