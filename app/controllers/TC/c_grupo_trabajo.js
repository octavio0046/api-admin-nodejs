/**
 * Controlador de Funciones de Grupo de Trabajo
 * @name: c_GrupoTrabajo
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad Funciones de Grupo de Trabajo.
 * Fecha: 23/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const GrupoTrabajo = db.GrupoTrabajo;
const TipoPersona = db.TipoPersona;
const Empresa = db.Empresa;
const UnidadNegocio = db.UnidadNegocio;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo GrupoTrabajo
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    GrupoTrabajo.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para la busqueda de un nuevo GrupoTrabajo
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    GrupoTrabajo.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [
        {
            model: UnidadNegocio,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }
    ],
    limit: 100,
    order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Descripcion: doc.Descripcion,
                    Email: doc.Email,
                    WebPage: doc.WebPage,
                    Telefono: doc.Telefono,
                    UnidadNegocio: doc.TC_Unidades_Negocio.Nombre,
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
 * @description: Resuelve una solicitud para la busqueda por estaado de un nuevo GrupoTrabajo
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAllEstado = (req, res) => {
    GrupoTrabajo.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [
        {
            model: UnidadNegocio,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }
    ],
    where: {
        Estado: 'Activo'
    },
    limit: 100,
    order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Descripcion: doc.Descripcion,
                    Email: doc.Email,
                    WebPage: doc.WebPage,
                    Telefono: doc.Telefono,
                    UnidadNegocio: doc.TC_Unidades_Negocio.Nombre,
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
 * @description: Resuelve una solicitud para la busqueda por id de un GrupoTrabajo
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    GrupoTrabajo.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la actualizacion de datos de un GrupoTrabajo
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    GrupoTrabajo.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un GrupoTrabajo
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    GrupoTrabajo.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del Departamento.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    GrupoTrabajo.findAndCountAll({
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