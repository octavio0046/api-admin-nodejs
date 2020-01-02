/**
 * Controlador de Empresa
 * @name: c_empresa
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad empresa.
 * Fecha: 19/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const Empresa = db.Empresa;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de una nueva Empresa
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */

exports.create = (req, res) => {
    Empresa.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });

};

/**
 * @description: Resuelve una solicitud para la busqueda Empresa
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    Empresa.findAndCountAll({
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};

exports.findAllEstado = (req, res) => {
    Empresa.findAndCountAll({
        where: {
            id: req.userData.TCEmpresaId,
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
 * @description: Resuelve una solicitud para la busqueda de Empresa por id
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    Empresa.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la actualizacion de una Empresa
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    Empresa.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de una Empresa
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    Empresa.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Empresa.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Empresa.findAndCountAll({
        where: {
            id: req.userData.TCEmpresaId,
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