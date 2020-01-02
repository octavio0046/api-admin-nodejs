'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Tipos_Personas_has_TC_Funciones', [{
      id: "1227d493-ffa8-4df5-89d5-e801b38d554a", 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      ADTiposPersonaId: "680cd517-f6f6-4112-ad75-394af99f325a",
      TCFuncioneId: "7cce35cb-5668-47c3-b36a-dde31b55723f"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Tipos_Personas_Has_TC_Funciones', null, {});
  }
};