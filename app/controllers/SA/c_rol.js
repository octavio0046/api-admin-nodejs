/**
 * Controlador de rol
 * @name: c_rol_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad rol.
 * Fecha: 18/09/2019
 */


const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const Rol = db.Rol;
const Op = db.Sequelize.Op;

/**
 * @description: Resuelve una solicitud para el almacenamiento de rol.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    Rol.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });

};
/**
 * @description: Resuelve una solicitud para la busqueda de rol.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    Rol.findAndCountAll({
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
    Rol.findAndCountAll({
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
 * @description: Resuelve una solicitud para la busqueda por id de rol.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    Rol.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};


/**
 * @description: Resuelve una solicitud para la busqueda de perfil de rol relacionada.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findPerfil = (req, res) => {
    
    db.sequelize.query("call PerfilXId('" + req.params.Id + "')").then(datos => {
        const resp = {
           Rol: datos[0].Rol,
           Persona: datos[0].Persona
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });

};


/**
* @description: Resuelve una solicitud para gnerar el menu segun el rol.
* @author: Smart Devs S.E
* Fecha: 02/10/2019
* @param  {} req: solicitud a resolver
* @param  {} res: respuesta a la solicitud dada
*/


exports.findMenuId = (req, res) => {
   
   db.sequelize.query("call GetGeneraMenuXId('" + req.params.Id + "')").then(datos => {
       res.status(200).json(datos);
   }).catch(err => {
      res.status(500).json(err);
   });

};


/**
 * @description: Resuelve una solicitud para la actualizacion de rol.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    Rol.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la eliminacion de rol.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    Rol.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del Rol.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Rol.findAndCountAll({
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