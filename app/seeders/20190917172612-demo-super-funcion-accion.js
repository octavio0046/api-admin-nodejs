'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones', [{
      id: "2dc1c7c6-cb83-438a-a5d1-6db5e18ba05f", 
      Nombre: "Funciones Acciones",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAModuloId: "8fbc8771-25a9-47cb-8c67-53387f9891bb"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones', null, {});
  }
};