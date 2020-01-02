'use strict';
const uuidv4 = require('uuid/v4');
module.exports = {
  
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Roles_Funciones', [{
      id: uuidv4(), 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "3d0dfe3a-6c34-4656-8f22-6dea05e2e54e",
      SARolId: "12a33b7c-ebc3-4ad5-b4d1-230a01570664"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Roles_Funciones', null, {});
  }
};