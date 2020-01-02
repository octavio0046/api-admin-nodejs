
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Grupos_Trabajos', [{
      id: "71edd785-a8db-42f2-9c15-47c2989bf6a2", 
      Nombre: "Rapid S.A",
      Email: "empresa@gmail.com",
      WebPage: "www.empresa.com",
      Telefono: "77645555",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      ADTiposPersonaId: "680cd517-f6f6-4112-ad75-394af99f325a",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924",
      TCUnidadesNegocioID: "71edd785-a8db-42f2-9c15-47c2989bf6a2"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Grupos_Trabajos', null, {});
  }
};