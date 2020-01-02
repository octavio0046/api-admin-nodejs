/**
 * Rutas de grado_asignacion_curso
 * @name: r_grado_asignacion_curso
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de grado_asignacion_curso.
 * Fecha: 24/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/WF/c_grado_asignacion_curso');


router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;