'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TC_Empresas_has_TC_Localizadores', [{
      id: "5cc4f5f5-1b73-467c-9c2a-8adf0768678d",
      Nombre: "Email",
      Descripcion: "Correo de la empresa",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924",
      TCTiposLocalizadoreId: "ea0915b5-8cd5-4a48-9e3d-4f7880ce114d"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TC_Empresas_has_TC_Localizadores', null, {});
  }
};