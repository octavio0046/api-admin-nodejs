'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones_Acciones', [{
      id: "d1f7df58-300b-49b4-8685-e2e5f0848172", 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "2dc1c7c6-cb83-438a-a5d1-6db5e18ba05f",
      SAAccionId: "9392ebd6-6578-4bec-b67a-6d83593e89b6"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones_Acciones', null, {});
  }
};