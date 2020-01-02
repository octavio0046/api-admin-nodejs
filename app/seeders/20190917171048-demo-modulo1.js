'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Modulos', [{
      id: "8fbc8771-25a9-47cb-8c67-53387f9891bb", 
      Nombre: "Super",
      Icono: "icon-grid",
      Orden: 1,
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Modulos', null, {});
  }
};