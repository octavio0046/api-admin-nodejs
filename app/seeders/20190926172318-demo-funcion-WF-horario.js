'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones', [{
      id: "e6a92c7b-429d-4c68-87ea-967321dbfff3", 
      Nombre: "Horarios",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAModuloId: "c3f0e714-392c-4d3f-bbae-49e2876b0605"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones', null, {});
  }
};