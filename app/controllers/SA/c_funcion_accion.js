/**
 * Controlador de funcion accion
 * @name: c_funcion_accion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad de funcion accion.
 * Fecha: 18/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const FuncionAccion = db.FuncionAccion;
const Funcion = db.Funcion;
const Modulo = db.Modulo;
const Op = db.Sequelize.Op;



/**
 * @description: Resuelve una solicitud para el almacenamiento de funcion accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    req.body.SAFuncionId.forEach(function (fun) {
        req.body.SAAccionId.forEach(function (acc) {
            data = {
                SAAccionId: acc.id,
                SAFuncionId: fun.id,
                TCEmpresaId: req.body.TCEmpresaId,
            };
            FuncionAccion.create(data)
                .then(Response => {
                    console.log(Response.data);
                }).catch(err => {
                    res.status(500).json(err.message);
                });
        });
    });

    res.status(200).json("exito");

};

/**
 * @description: Resuelve una solicitud para la busqueda de funcion accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    Funcion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: FuncionAccion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Modulo,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }
    ],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Modulo: doc.SA_Modulo.Nombre,
                    Acciones: doc.SA_Funciones_Acciones.length
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la busqueda por id de funcion accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    FuncionAccion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};
/**
 * @description: Resuelve una solicitud para la actualizacion de funcion accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    FuncionAccion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la eliminacion de funcion accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const SAFuncionId = req.params.Id;
    FuncionAccion.destroy({
        where: { SAFuncionId: SAFuncionId }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del FuncionAccion.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Funcion.findAndCountAll({
        include: [{
            model: FuncionAccion,
            required: false,     
        },
        {
            model: Modulo,
            required: false
        }],
        where: {
            TCEmpresaId: req.userData.TCEmpresaId,
            Nombre: {
                [Op.like]: `%${req.params.Txt}%`,               
            }            
        },
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Modulo: doc.SA_Modulo.Nombre,
                    Acciones: doc.SA_Funciones_Acciones.length
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });
};