/**
 * Controlador de curso_has_profesor
 * @name: c_curso_has_profesor
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad curso_has_profesor.
 * Fecha: 30/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const CursoHasProfesor = db.CursoHasProfesor;
const Curso = db.Curso;
const TipoPersona = db.TipoPersona;
const Persona = db.Persona;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo CursoHasProfesor
 * @author: Smart Devs S.E
 * Fecha: 30/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    CursoHasProfesor.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo CursoHasProfesor
 * @author: Smart Devs S.E
 * Fecha: 30/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    CursoHasProfesor.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: TipoPersona,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            },
            include: [{
                model: Persona,
                required: true,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId
                }
            }]
        }, 
        {
            model: Curso,
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
                console.log(doc);
                return {
                    id: doc.id,
                    Profesor: doc.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + doc.AD_Tipos_Persona.AD_Persona.Apellidos,
                    Curso: doc.WF_Curso.Nombre,
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
 * @description: Resuelve una solicitud para la busqueda por id de un CursoHasProfesor
 * @author: Smart Devs S.E
 * Fecha: 30/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    CursoHasProfesor.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la actualizacion de datos de un CursoHasProfesor
 * @author: Smart Devs S.E
 * Fecha: 30/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    CursoHasProfesor.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un CursoHasProfesor
 * @author: Smart Devs S.E
 * Fecha: 30/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    CursoHasProfesor.destroy({
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
    CursoHasProfesor.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: TipoPersona,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            },
            include: [{
                model: Persona,
                required: true,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId,
                    Nombres: {
                        [Op.like]: `%${req.params.Txt}%`,               
                    }            
                }
            }]
        }, 
        {
            model: Curso,
            required: false
        }]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                console.log(doc);
                return {
                    id: doc.id,
                    Profesor: doc.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + doc.AD_Tipos_Persona.AD_Persona.Apellidos,
                    Curso: doc.WF_Curso.Nombre,
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