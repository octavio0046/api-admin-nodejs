/**
 * Rutas de tipo_persona
 * @name: r_tipo_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Se definen las rutas de tipo_persona.
 * Fecha: 18/09/2019
 */

 
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-out');
const abc = require('../../controllers/AD/c_tipo_persona');
const multer = require('multer');
var upload = multer({dest:'tmp/csv/'});

router.post('/carga', checkAuth, upload.single('myfile'), abc.carga);

router.get('/', checkAuth, abc.findAll)
    .post('/', checkAuth, abc.create);

router.get('/estado', checkAuth, abc.detallesEstado);
router.get('/estado-profesor', checkAuth, abc.detallesProfesorEstado);
router.get('/profesor', checkAuth, abc.detallesProfesor);
router.get('/buscar/:Txt', checkAuth, abc.findLike);
router.get('/detalles', checkAuth, abc.detalles);
router.get('/detalles/:Id',checkAuth, abc.detallesId);

router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;