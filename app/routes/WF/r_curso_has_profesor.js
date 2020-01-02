/**
 * Rutas decurso_has_profesor
 * @name: r_curso_has_profesor
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas decurso_has_profesor.
 * Fecha: 24/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/WF/c_curso_has_profesor');


router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;