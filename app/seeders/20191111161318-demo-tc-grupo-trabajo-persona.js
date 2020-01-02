'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Grupos_Trabajos_AD_Personas', [{
      id: "71edd785-a8db-42f2-9c15-47c2989bf6a2",
      Nombre: "Grupo de trabajo 1",
      Descripcion: "descripcion prueba",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      ADPersonaId: "3483aa37-62f8-4d1d-8a47-e4b94377f2d2",
      TCGruposTrabajoId: "71edd785-a8db-42f2-9c15-47c2989bf6a2"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Grupos_Trabajos_AD_Personas', null, {});
  }
};