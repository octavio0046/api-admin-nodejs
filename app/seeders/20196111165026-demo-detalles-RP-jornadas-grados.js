'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "0daa17eb-d6fa-46d4-9488-9ee662bdf84d", 
      Ruta: "/app/reportes/pemsa-jornadas-grados",
      Orden: 37,
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "00faced2-2928-491c-9c7f-6bfe40c22912"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};