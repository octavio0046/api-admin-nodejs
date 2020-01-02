'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "44384c4a-2fbd-45c4-8b48-e3a1574d7654", 
      Ruta: "/app/catalogos/grupos-trabajos",
      Orden: 32,
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "3d0dfe3a-6c34-4656-8f22-6dea05e2e54e"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};