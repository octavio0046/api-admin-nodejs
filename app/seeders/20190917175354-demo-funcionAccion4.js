'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones_Acciones', [{
      id: "6e6da4af-2a2c-4e9e-8986-36631eeae4da", 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "2dc1c7c6-cb83-438a-a5d1-6db5e18ba05f",
      SAAccionId: "e84fb9ab-984e-4c21-a3cb-e3a3d70eaf83"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones_Acciones', null, {});
  }
};