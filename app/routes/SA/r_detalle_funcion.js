/**
 * Rutas de detalle_funcion
 * @name: r_detalle_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de detalle_funcion.
 * Fecha: 18/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/SA/c_detalle_funcion');


router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/detalle/', checkAuth, abc.detalle);

router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;