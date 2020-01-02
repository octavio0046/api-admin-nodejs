/**
 * Rutas de rol
 * @name: r_rol
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de rol.
 * Fecha: 18/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/SA/c_rol');


router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);

router.get('/estado', checkAuth, abc.findAllEstado);    
router.get('/perfil/:Id', checkAuth, abc.findPerfil);
router.get('/menu/:Id', checkAuth, abc.findMenuId);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;