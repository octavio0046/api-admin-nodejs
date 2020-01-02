'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Modulos', [{
      id: "9fc6fb1a-adfb-424e-9830-6e913f5d4ed8", 
      Nombre: "Procesos",
      Icono: "icon-grid",
      Orden: 5,
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Modulos', null, {});
  }
};