'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Tipos_Localizadores', [{
      id: "ea0915b5-8cd5-4a48-9e3d-4f7880ce114d", 
      Nombre: "Localizador 1",
      Descripcion: "esto es una prueba",
      Estado: "Activo",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Tipos_Localizadores', null, {});
  }
};
