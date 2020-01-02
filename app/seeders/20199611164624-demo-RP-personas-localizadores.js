'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones', [{
      id: "a34af7c5-7aa8-4357-adec-21e71419caeb", 
      Nombre: "Personas Localizadores",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAModuloId: "8b0ac698-1583-44da-b656-1eabdb7217de"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones', null, {});
  }
};