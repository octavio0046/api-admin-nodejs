/**
 * Rutas de bitacora
 * @name: r_bitacora
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de bitacora.
 * Fecha: 18/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/SA/c_bitacora');


router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/detalle/', checkAuth, abc.detalle);

router.get('/:Id', checkAuth, checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);


module.exports = router;