/**
 * Rutas de FuncionGrupoTrabajo
 * @name: r_funcion_grupo_trabajo
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de FuncionGrupoTrabajo.
 * Fecha: 23/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/TC/c_grupo_trabajo');


router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);

router.get('/estado', checkAuth, abc.findAllEstado);

router.get('/buscar/:Txt', checkAuth, abc.findLike);

router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;