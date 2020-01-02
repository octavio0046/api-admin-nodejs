/**
 * Rutas de horario
 * @name: r_horario
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de horario.
 * Fecha: 24/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/WF/c_horario');
const multer = require('multer');
var upload = multer({dest:'tmp/csv/'});

router.post('/carga', checkAuth, upload.single('myfile'), abc.carga);

router.get('/estado', checkAuth, abc.findAllEstado);

router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;