'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AD_Usuarios', [{
      id: "ff10d625-1703-4993-b54c-192fb790a71f", 
      Email: "Usuario1@gmail.com",
      Nombre: "user1",
      Clave: "$2b$08$ndvX5xhaNSfcyPOQ/uTrE.SMfzUF7TkTEcpvenZCx1rWJ8lSOrBFG",
      Intentos: 5,
      Reinicio: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SARolId:"12a33b7c-ebc3-4ad5-b4d1-230a01570664", 
      ADTipoPersonaId: "680cd517-f6f6-4112-ad75-394af99f325a",
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AD_Usuarios', null, {});
  }
};