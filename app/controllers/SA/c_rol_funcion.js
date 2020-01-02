/**
 * Controlador de modulo
 * @name: c_rol_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad rol funcion.
 * Fecha: 18/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const RolFuncion = db.RolFuncion;
const Rol = db.Rol;
const Op = db.Sequelize.Op;



/**
 * @description: Resuelve una solicitud para el almacenamiento de modulo.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    req.body.SARolId.forEach(function (rol) {
        req.body.SAFuncionId.forEach(function (fun) {
            data = {
                SAFuncionId: fun.id,
                SARolId: rol.id,
                TCEmpresaId: req.body.TCEmpresaId
            };
            RolFuncion.create(data)
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
 * @description: Resuelve una solicitud para la busqueda y la funcion relacionada con modulo.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Nombre, Funciones}: valores a retornar
 */
exports.findAll = (req, res) => {
    Rol.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: RolFuncion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Funciones: doc.SA_Roles_Funciones.length
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la busqueda por id de modulo.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    RolFuncion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};
/**
 * @description: Resuelve una solicitud para la actualizacion de modulo.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    RolFuncion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la eliminacion de modulo.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const SARolId = req.params.Id;
    RolFuncion.destroy({
        where: { SARolId: SARolId }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del RolFuncion.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Rol.findAndCountAll({
        include: [{
            model: RolFuncion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
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
                    Funciones: doc.SA_Roles_Funciones.length
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });
};
