'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Cursos_Has_Profesores', [{
      id: "12119fb2-a2e5-4831-a683-3ef631cd083e", 
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      WFCursoId: "1eea964b-f65a-48fb-b526-eb6c55c868f5",
      ADTiposPersonaId: "680cd517-f6f6-4112-ad75-394af99f325a"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Cursos_Has_Profesores', null, {});
  }
};