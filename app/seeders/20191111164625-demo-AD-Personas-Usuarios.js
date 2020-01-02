'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Funciones', [{
      id: "49e1649e-eaa2-4364-86c6-2e41237a6a3d", 
      Nombre: "Persona Usuarios",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAModuloId: "9fc6fb1a-adfb-424e-9830-6e913f5d4ed8"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Funciones', null, {});
  }
};