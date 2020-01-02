'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Funciones', [{
      id: "7cce35cb-5668-47c3-b36a-dde31b55723f", 
      Nombre: "funcion 1",
      Descripcion: "esto es una prueba",
      Estado: "Activo",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Funciones', null, {});
  }
};
