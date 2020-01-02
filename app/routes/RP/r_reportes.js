/**
 * Rutas de color
 * @name: smart-api-escuelas
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de reportes.
 * Fecha: 27/11/2019
 */


const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/RP/c_reportes');

router.get('/resumen', checkAuth, abc.findRPTResumen);
router.get('/grupos-trabajo', checkAuth, abc.findRPTGrupoTrabajo);
router.get('/pemsa-jornadas-grados', checkAuth, abc.findRPTJornadaGrado);
router.get('/personas-empleados', checkAuth, abc.findRPTPersonaEmpleado);
router.post('/asignaciones-grados', checkAuth, abc.findRPTAsignaciones);
router.post('/asignaciones-grados-cursos', checkAuth, abc.findRPTAsignacionesCursos);
router.post('/cursos-profesores', checkAuth, abc.findRPTCursosProfesores);
router.post('/tipos-personas-funcion', checkAuth, abc.findRPTTipoPersonaFuncion);
router.post('/grupos-trabajo-filtro', checkAuth, abc.findRPTGrupoTrabajoFiltro);
router.post('/grupos-trabajo-encargado', checkAuth, abc.findRPTGrupoTrabajoEncargado);
router.post('/tipos-personas-localizador', checkAuth, abc.findRPTTipoPersonaLocalizador);

module.exports = router;