'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones_Acciones', [{
      id: "eab9915a-760e-4f74-9f27-0fff07bad271", 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "2dc1c7c6-cb83-438a-a5d1-6db5e18ba05f",
      SAAccionId: "fae0c8d1-3478-4142-bb13-e490042958cd"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones_Acciones', null, {});
  }
};