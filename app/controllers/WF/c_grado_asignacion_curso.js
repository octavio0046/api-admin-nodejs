/**
 * Controlador de grados_asignacion_cursos
 * @name: c_grados_asignacion_cursos
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad grados_asignacion_cursos.
 * Fecha: 24/09/2019
 */


const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const GradoAsignacionCurso = db.GradoAsignacionCurso;
const GradoAsignacion = db.GradoAsignacion;
const Curso = db.Curso;
const Horario = db.Horario;
const Grado = db.Grado;
const Seccion = db.Seccion;
const Carrera = db.Carrera;
const Jornada = db.Jornada;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo GradoAsignacionCurso
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    req.body.Dias.forEach(function (fun) {
        data = {
            id: req.body.id,
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Dias: fun.Dia,
            Estado: req.body.Estado,
            WFHorarioId: req.body.WFHorarioId,
            WFCursoId: req.body.WFCursoId,
            WFGradosAsignacioneId: req.body.WFGradosAsignacioneId,
            TCEmpresaId: req.body.TCEmpresaId

        };
        GradoAsignacionCurso.create(data)
            .then(Response => {
                console.log(Response.data);
            }).catch(err => {
                res.status(500).json(err.message);
            });
    });
    res.status(200).json("exito");
};

/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo GradoAsignacionCurso
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    GradoAsignacionCurso.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Horario,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Curso,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: GradoAsignacion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            },
            include: [
                {
                    model: Grado,
                    required: false,
                    where: {
                        TCEmpresaId: req.userData.TCEmpresaId
                    }
                }
            ]
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
                    Dia: doc.Dias,
                    HoraInicial: doc.WF_Horario.HorarioInicial,
                    HoraFinal: doc.WF_Horario.HorarioFinal,
                    Grado: doc.WF_Grados_Asignacione.WF_Grado.Nombre,
                    Curso: doc.WF_Curso.Nombre,
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
 * @description: Resuelve una solicitud para la busqueda por id de un GradoAsignacionCurso
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    GradoAsignacionCurso.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la actualizacion de datos de un GradoAsignacionCurso
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    GradoAsignacionCurso.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un GradoAsignacionCurso
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    GradoAsignacionCurso.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Grado y Curso.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    GradoAsignacionCurso.findAndCountAll({
        include: [{
            model: Horario,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        },
        {
            model: Curso,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            },
        },
        {
            model: GradoAsignacion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            },
            include: [
                {
                    model: Grado,
                    required: false,
                    where: {
                        TCEmpresaId: req.userData.TCEmpresaId
                    }
                }
            ]
        }
        ],
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
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Dia: doc.Dias,
                    HoraInicial: doc.WF_Horario.HorarioInicial,
                    HoraFinal: doc.WF_Horario.HorarioFinal,
                    Grado: doc.WF_Grados_Asignacione.WF_Grado.Nombre,
                    Curso: doc.WF_Curso.Nombre,
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
