'use strict';
const uuidv4 = require('uuid/v4');
module.exports = {
  
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SA_Roles_Funciones', [{
      id: uuidv4(), 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      SAFuncionId: "f380d1d4-f481-44fe-874e-db2c6751c69f",
      SARolId: "12a33b7c-ebc3-4ad5-b4d1-230a01570664"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SA_Roles_Funciones', null, {});
  }
};