/**
 * Controlador de grado_asignacion
 * @name: c_grado_asignacion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad grado_asignacion.
 * Fecha: 24/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const GradoAsignacion = db.GradoAsignacion;
const Grado = db.Grado;
const Seccion = db.Seccion;
const Carrera = db.Carrera;
const Jornada = db.Jornada;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo GradoAsignacion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    GradoAsignacion.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo GradoAsignacion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    GradoAsignacion.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Carrera,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }, 
        {
            model: Seccion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Grado,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Jornada,
            required: false,
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
                    Nombre: doc.Nombre,
                    Descripcion: doc.Descripcion,
                    Carrera: doc.WF_Carrera.Nombre,
                    Grado: doc.WF_Grado.Nombre,
                    Seccion: doc.WF_Seccione.Nombre,
                    Jornada: doc.WF_Jornada.Jornada,
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

exports.findAllEstado = (req, res) => {
    GradoAsignacion.findAndCountAll({
        include: [{
            model: Carrera,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }, 
        {
            model: Seccion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Grado,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Jornada,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }],
        where: {
            TCEmpresaId: req.userData.TCEmpresaId,
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
                    Carrera: doc.WF_Carrera.Nombre,
                    Grado: doc.WF_Grado.Nombre,
                    Seccion: doc.WF_Seccione.Nombre,
                    Jornada: doc.WF_Jornada.Jornada,
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
 * @description: Resuelve una solicitud para la busqueda por id de un GradoAsignacion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    GradoAsignacion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la actualizacion de datos de un GradoAsignacion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    GradoAsignacion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un GradoAsignacion
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    GradoAsignacion.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Curso y profesor.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    GradoAsignacion.findAndCountAll({
        include: [{
            model: Carrera,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }, 
        {
            model: Seccion,
            required: false,  
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Grado,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Jornada,
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
            } ,
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
                    Carrera: doc.WF_Carrera.Nombre,
                    Grado: doc.WF_Grado.Nombre,
                    Seccion: doc.WF_Seccione.Nombre,
                    Jornada: doc.WF_Jornada.Jornada,
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
