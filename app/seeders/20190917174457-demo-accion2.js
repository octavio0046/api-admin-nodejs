'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Acciones', [{
      id: "9b3d7e80-4e3f-4c98-b0d4-ca2ccb9de538", 
      Nombre: "Actualizar1",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Acciones', null, {});
  }
};