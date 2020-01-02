'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Grados', [{
      id: "5e99b302-523f-4af4-bc55-7c8afcf2dde8", 
      Nombre: "Primero",
      Descripcion: "primera anio de la carrera",
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Grados', null, {});
  }
};