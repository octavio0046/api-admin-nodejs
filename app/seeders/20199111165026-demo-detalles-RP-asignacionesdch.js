'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "4699669a-b6b9-4ed2-8544-bfe052788249", 
      Ruta: "/app/reportes/asignacionesdch",
      Orden: 40,
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "00ffef3c-dae8-4624-a103-837eaaa71699"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};