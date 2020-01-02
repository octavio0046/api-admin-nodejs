/**
 * Rutas de departamento
 * @name: r_departamento
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de departamento.
 * Fecha: 19/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/TC/c_departamento');
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