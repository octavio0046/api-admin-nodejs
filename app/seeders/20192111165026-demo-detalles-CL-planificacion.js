'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "c9b3d931-200a-43f3-9a66-6c85ae60762a", 
      Ruta: "/app/calendarizacion/planificacion",
      Orden: 33,
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "30fbe6aa-0a3c-4a60-8450-d405d92c2962"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};