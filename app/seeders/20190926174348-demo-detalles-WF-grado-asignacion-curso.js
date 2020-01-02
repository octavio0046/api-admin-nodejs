'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "566166d7-ccec-4b4c-a7c4-7360e9acf908",
      Ruta: "/app/work/grado-asignacion-curso",
      Orden: 28, 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "566166d7-ccec-4b4c-a7c4-7360e9acf908"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};