'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones_Acciones', [{
      id: "640198b3-0df3-47bc-8133-a926336995e5", 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "2dc1c7c6-cb83-438a-a5d1-6db5e18ba05f",
      SAAccionId: "9b3d7e80-4e3f-4c98-b0d4-ca2ccb9de538"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones_Acciones', null, {});
  }
};