/**
 * Rutas de grupo_trabajo_persona
 * @name: r_grupo_trabajo_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de grupo_trabajo_persona.
 * Fecha: 11/11/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/TC/c_grupo_trabajo_persona');

router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;