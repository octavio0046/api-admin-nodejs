'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WF_Grados_Asignaciones_Cursos', [{
      id: "3c9239bd-e4ee-495b-a5f6-2f55d84b72e8", 
      Nombre: "Asignacion-grado-1",
      Dias: "Lunes",
      createdAt: new Date(),
      updatedAt: new Date(),
      TCEmpresaId: "906ddc6c-acb2-4c2e-8768-27f6c6919924", 
      WFHorarioId: "97640648-fa2f-45a7-97c0-4fb33b3e9d7c",
      WFCursoId: "1eea964b-f65a-48fb-b526-eb6c55c868f5",
      WFGradosAsignacioneId: "3c9239bd-e4ee-495b-a5f6-2f55d84b72e8",
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WF_Grados_Asignaciones_Cursos', null, {});
  }
};