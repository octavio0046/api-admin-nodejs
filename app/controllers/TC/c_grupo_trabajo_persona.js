/**
 * Controlador de grupo_trabajo_persona
 * @name: c_GrupoTrabajoPersona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad grupo_trabajo_persona.
 * Fecha: 11/11/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const GrupoTrabajoPersona = db.GrupoTrabajoPersona;
const GrupoTrabajo = db.GrupoTrabajo;
const Persona = db.Persona;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo GrupoTrabajoPersona
 * @author: Smart Devs S.E
 * Fecha: 11/11/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */

exports.create = (req, res) => {
    GrupoTrabajoPersona.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });

};

/**
 * @description: Resuelve una solicitud para la busqueda GrupoTrabajoPersona
 * @author: Smart Devs S.E
 * Fecha: 11/11/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    GrupoTrabajoPersona.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Persona,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: GrupoTrabajo,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            },
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
                    Descripcion: doc.Descripcion,
                    Persona: doc.AD_Persona.Nombres + ' ' +  doc.AD_Persona.Apellidos,
                    GrupoTrabajo: doc.TC_Grupos_Trabajo.Nombre,
                    Estado: doc.Estado,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la busqueda de GrupoTrabajoPersona por id
 * @author: Smart Devs S.E
 * Fecha: 11/11/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    GrupoTrabajoPersona.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la actualizacion de un GrupoTrabajoPersona
 * @author: Smart Devs S.E
 * Fecha: 11/11/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    GrupoTrabajoPersona.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un GrupoTrabajoPersona
 * @author: Smart Devs S.E
 * Fecha: 11/11/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    GrupoTrabajoPersona.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};


/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del GrupoTrabajoPersona.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    GrupoTrabajoPersona.findAndCountAll({
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
