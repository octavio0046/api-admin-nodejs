'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Unidades_Negocios', [{
      id: "71edd785-a8db-42f2-9c15-47c2989bf6a2", 
      Nombre: "unidad 1",
      Descripcion: "la unidad realiza",
      createdAt: new Date(),
      updatedAt: new Date(),
      ADTiposPersonaId: "680cd517-f6f6-4112-ad75-394af99f325a",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924",
      TCMunicipioId: "e1e058bf-e3c9-4f62-9004-903d216ee3b2"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Unidades_Negocios', null, {});
  }
};
