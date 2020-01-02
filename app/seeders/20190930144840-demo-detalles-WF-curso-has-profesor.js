'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "a00d20a0-c375-4ce8-97cf-21c6a88714a6",
      Ruta: "/app/work/cursos-profesores",
      Orden: 30, 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "45605ad5-95e3-4191-8af4-fb9758e46908"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};