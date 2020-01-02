'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Cursos', [{
      id: "1eea964b-f65a-48fb-b526-eb6c55c868f5", 
      Nombre: "Comida Tipica",
      Descripcion: "Nacional",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Cursos', null, {});
  }
};