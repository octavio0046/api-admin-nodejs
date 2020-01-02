/**
 * Controlador de tipo_persona_has_funcion
 * @name: c_tipo_persona_has_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad tipo_persona_has_funcion.
 * Fecha: 19/09/2019
 */

const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const TipoPersonaHasFuncion = db.TipoPersonaHasFuncion;
const TipoPersona = db.TipoPersona;
const Persona = db.Persona;
const TCFuncion = db.TcFuncion;
const Op = db.Sequelize.Op;
const csv = require('csv-parser');
const fs = require('fs');

/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo tipo_persona_has_funcion
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */

exports.create = (req, res) => {
    TipoPersonaHasFuncion.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para la busqueda tipo_persona_has_funcion
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    TipoPersonaHasFuncion.findAndCountAll({
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
        }, {
            model: TCFuncion,
            required: false,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }
    ).then(response => {

        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Funcion: doc.TC_Funcione.Nombre,
                    Persona: doc.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + doc.AD_Tipos_Persona.AD_Persona.Apellidos,
                    createdAt: doc.updatedAt,
                    updatedAt: doc.createdAt
                };
            })
        };

        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
        //SpanishError.resolver(err, res);
    });

};

/**
 * @description: Resuelve una solicitud para la busqueda de tipo_persona_has_funcion por id
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    TipoPersonaHasFuncion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la actualizacion de un tipo_persona_has_funcion
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    TipoPersonaHasFuncion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un tipo_persona_has_funcion
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    TipoPersonaHasFuncion.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Tipo Localizador.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    TipoPersonaHasFuncion.findAndCountAll({
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
        }, {
            model: TCFuncion,
            required: false
        }],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {

        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Funcion: doc.TC_Funcione.Nombre,
                    Persona: doc.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + doc.AD_Tipos_Persona.AD_Persona.Apellidos,
                    createdAt: doc.updatedAt,
                    updatedAt: doc.createdAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
        console.log(err);
    });
};
/**
 * @description: Resuelve una solicitud para obtener la carga de tipo persona funcion.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.carga = (req, res) => {
    const results = [];
    try {
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => {
                idEmpresa = {TCEmpresaId: req.userData.TCEmpresaId};
                campos = Object.assign(data, idEmpresa);
                results.push(campos)
            })
            .on('end', () => {
                results.forEach(function (fun) {
                    TipoPersonaHasFuncion.create(fun);
                });
            });
        res.status(200).json(results)
    }
    catch (err) {
        res.status(500).json(err);
    }
};