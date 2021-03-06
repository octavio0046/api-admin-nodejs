/**
 * Controlador de seccion
 * @name: c_seccion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad seccion.
 * Fecha: 24/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const Seccion = db.Seccion;
const Op = db.Sequelize.Op;
const csv = require('csv-parser');
const fs = require('fs');


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo Seccion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    Seccion.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo Seccion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    Seccion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

exports.findAllEstado = (req, res) => {
    Seccion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId,
            Estado: 'Activo'
        },
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};


/**
 * @description: Resuelve una solicitud para la busqueda por id de un Seccion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    Seccion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la actualizacion de datos de un Seccion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    Seccion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un Seccion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    Seccion.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Seccion.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Seccion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId,
            Nombre: {
                [Op.like]: `%${req.params.Txt}%`
            }
        },
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para obtener la carga de Seccion.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.carga = (req, res) => {
    const results = [];
    try {
  
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) =>{
                idEmpresa = {TCEmpresaId: req.userData.TCEmpresaId};
                campos = Object.assign(data, idEmpresa);
                results.push(campos)
            })
            .on('end', () => {                
                results.forEach(function (fun) {
                    Seccion.create(fun);
                });
            });
            res.status(200).json(results)
    }
    catch (err) {
        res.status(500).json(err);
    }
};