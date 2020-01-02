/**
 * Rutas de usuario
 * @name: r_usuario
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de usuario.
 * Fecha: 18/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/AD/c_usuario');
const multer = require('multer');
var upload = multer({dest:'tmp/csv/'});

router.post('/carga', checkAuth, upload.single('myfile'), abc.carga);
router.get('/', checkAuth, abc.findAll)
    .post('/signup', abc.user_signup);

router.post('/reinicio', abc.reinicio);    
router.get('/estado', checkAuth, abc.findAllEstado);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.post('/login', abc.user_login);
router.post('/', abc.create);
router.get('/perfil/:Id',checkAuth, abc.perfil);
router.get('/noasignados', checkAuth, abc.noasignados);
router.get('/persona', checkAuth, abc.persona);


router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;