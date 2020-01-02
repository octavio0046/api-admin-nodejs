/**
 * Controlador de detalle funcion
 * @name: c_detalle_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad de detalle funcion.
 * Fecha: 18/09/2019
 */


const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const DetalleFuncion = db.DetalleFuncion;
const Funcion = db.Funcion;
const Modulo = db.Modulo
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de detalle funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {

    DetalleFuncion.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            res.status(500).json(err);
        });
};
/**
 * @description: Resuelve una solicitud para la busqueda de detalle funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    DetalleFuncion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Funcion,
            required: true,
            include: [{
                model: Modulo,
                required: false,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId
                }
            }],
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Funcion: doc.SA_Funcion.Nombre,
                    Modulo: doc.SA_Funcion.SA_Modulo.Nombre,
                    Ruta: doc.Ruta,
                    Orden: doc.Orden,
                    Estado: doc.Estado,
                    createdAt: doc.updatedAt,
                    updatedAt: doc.createdAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para realizar consulta de detalles de la entidad de detalle funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Nombre, createdAt, updatedAt}: valores a retornar
 */
exports.detalle = (req, res) => {
    DetalleFuncion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Funcion,
            required: true,
            include: [{
                model: Modulo,
                required: false,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId
                }
            }],
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Funcion: doc.SA_Funcion.Nombre,
                    Modulo: doc.SA_Funcion.SA_Modulo.Nombre,
                    Ruta: doc.Ruta,
                    Orden: doc.Orden,
                    Estado: doc.Estado,
                    createdAt: doc.updatedAt,
                    updatedAt: doc.createdAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la busqueda por id de detalle funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    DetalleFuncion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });

};
/**
 * @description: Resuelve una solicitud para la actualizacion de detalle funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    DetalleFuncion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la eliminacion de detalle funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    DetalleFuncion.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del DetalleFuncion.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    DetalleFuncion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Funcion,
            required: true,
            include: [{
                model: Modulo,
                required: false,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId
                }
            }],
            where: {
                TCEmpresaId: req.userData.TCEmpresaId,
                Nombre: {
                    [Op.like]: `%${req.params.Txt}%`
                }
            },
        }],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Funcion: doc.SA_Funcion.Nombre,
                    Modulo: doc.SA_Funcion.SA_Modulo.Nombre,
                    Ruta: doc.Ruta,
                    Orden: doc.Orden,
                    Estado: doc.Estado,
                    createdAt: doc.updatedAt,
                    updatedAt: doc.createdAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
    });
};