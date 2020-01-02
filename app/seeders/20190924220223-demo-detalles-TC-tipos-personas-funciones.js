'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Detalles_funciones', [{
      id: "0c69bda5-3dbf-4399-ba8f-9e09a371dae4", 
      Ruta: "/app/catalogos/tipos-personas-funciones",
      Orden: 17,
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "ec72b8b6-df0c-11e9-8a34-2a2ae2dbcce4"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Detalles_funciones', null, {});
  }
};