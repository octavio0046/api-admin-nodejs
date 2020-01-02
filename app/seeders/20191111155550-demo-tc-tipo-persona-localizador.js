'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Tipos_Personas_has_TC_Localizadores', [{
      id: "a33bba90-0b8e-47bb-b104-385bb8d2faba", 
      Nombre: "Telefono",
      Descripcion: "telefono de la persona",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      ADTiposPersonaId: "680cd517-f6f6-4112-ad75-394af99f325a",
      TCTiposLocalizadoreId: "ea0915b5-8cd5-4a48-9e3d-4f7880ce114d"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Tipos_Personas_Has_TC_Localizadores', null, {});
  }
};