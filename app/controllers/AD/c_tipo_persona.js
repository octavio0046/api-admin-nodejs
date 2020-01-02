/**
 * Controlador de tipo_persona
 * @name: c_tipo_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad tipo_persona.
 * Fecha: 18/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const TipoPersona = db.TipoPersona;
const Persona = db.Persona;
const Municipio = db.Municipio;
const TipoPersonaFuncion = db.TipoPersonaHasFuncion;
const Funcion = db.TcFuncion;
const Op = db.Sequelize.Op;
const csv = require('csv-parser');
const fs = require('fs');

/**
 * @description: Resuelve una solicitud para el almacenamiento de tipo_persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    if (Array.isArray(req.body.TCMunicipioId)) {
        req.body.TCMunicipioId = req.body.TCMunicipioId[0].id;
    } else {
        req.body.TCMunicipioId = req.body.TCMunicipioId;
    }

    if (Array.isArray(req.body.ADPersonaId)) {
        req.body.ADPersonaId = req.body.ADPersonaId[0].id;
    } else {
        req.body.ADPersonaId = req.body.ADPersonaId;
    }

    TipoPersona.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });

};
/**
 * @description: Resuelve una solicitud para la busqueda de tipo_persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    TipoPersona.findAndCountAll({
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

/**
 * @description: Resuelve una solicitud para la busqueda por id de tipo_persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    TipoPersona.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};
/**
 * @description: Resuelve una solicitud para la actualización de tipo_persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    TipoPersona.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la eliminación de tipo_persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    TipoPersona.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resolvera una consulta donde mostrara datos especificos de la persona que esta relacionada con un tipo de persona
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Persona, Tipo, Estado, createdAt, updatedAt}: Valores que seran retornado
 */
exports.detalles = (req, res) => {
    TipoPersona.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        limit: 100,
        attributes: [
            'id',
            'Nit',
            'Estado',
            'createdAt',
            'updatedAt'],
        include: [{
            model: Persona,
            required: true,
            attributes: [
                'Nombres',
                'Apellidos']
        }],
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nit: doc.Nit,
                    Persona: doc.AD_Persona.Nombres + " " + doc.AD_Persona.Apellidos,
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

exports.detallesProfesor = (req, res) => {
    TipoPersonaFuncion.findAndCountAll({
            limit: 100,
            include: [{
                model: Funcion,
                required: true,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId,
                    Nombre: 'Profesor'
                }      
            },
            {
                model: TipoPersona,
                required: true,
                include: [{
                    model:Persona,
                    required: true,
                    where: {
                        TCEmpresaId: req.userData.TCEmpresaId,
                        Estado: 'Activo'
                    }
                }],
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId,
                    Estado: 'Activo'
                }      
            }
        
        ],
            where: {
                TCEmpresaId: req.userData.TCEmpresaId,
                Estado: 'Activo'
            }
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.AD_Tipos_Persona.id,
                    Nit: doc.AD_Tipos_Persona.Nit,
                    Persona: doc.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + doc.AD_Tipos_Persona.AD_Persona.Apellidos,
                    Estado: doc.AD_Tipos_Persona.Estado,
                    createdAt: doc.AD_Tipos_Persona.createdAt,
                    updatedAt: doc.AD_Tipos_Persona.updatedAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err.message);
    });
};


exports.detallesProfesorEstado = (req, res) => {
    TipoPersonaFuncion.findAndCountAll({
            limit: 100,
            include: [{
                model: Funcion,
                required: true,
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId,
                    Estado: 'Activo',
                    Nombre: 'Profesor'
                }      
            },
            {
                model: TipoPersona,
                required: true,
                include: [{
                    model:Persona,
                    required: true,
                    where: {
                        TCEmpresaId: req.userData.TCEmpresaId,
                        Estado: 'Activo'
                    }
                }],
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId,
                    Estado: 'Activo'
                }      
            }
        
        ],
            where: {
                TCEmpresaId: req.userData.TCEmpresaId,
                Estado: 'Activo'
            }
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.AD_Tipos_Persona.id,
                    Nit: doc.AD_Tipos_Persona.Nit,
                    Persona: doc.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + doc.AD_Tipos_Persona.AD_Persona.Apellidos,
                    Estado: doc.AD_Tipos_Persona.Estado,
                    createdAt: doc.AD_Tipos_Persona.createdAt,
                    updatedAt: doc.AD_Tipos_Persona.updatedAt
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err.message);
    });
};
/**
 * @description: Resolvera una consulta donde mostrara datos especificos de la persona que esta relacionada con un tipo de persona
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Persona, Tipo, Estado, createdAt, updatedAt}: Valores que seran retornado
 */
exports.detallesEstado = (req, res) => {
    TipoPersona.findAndCountAll({
        limit: 100,
        attributes: [
            'id',
            'Nit',
            'Estado',
            'createdAt',
            'updatedAt'],
        include: [{
            model: Persona,
            required: true,
            attributes: [
                'Nombres',
                'Apellidos'],
                where: {
                    TCEmpresaId: req.userData.TCEmpresaId,
                    Estado: 'Activo'
                }
                
        }],
        where: {
            TCEmpresaId: req.userData.TCEmpresaId,
            Estado: 'Activo'
        },
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nit: doc.Nit,
                    Persona: doc.AD_Persona.Nombres + " " + doc.AD_Persona.Apellidos,
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
 * @description: Resolvera una consulta donde mostrara el municipio donde la persona reside.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id,Nombres,Apellidos,Nacimiento,Identificacion,TCPersonaId,Nit,Telefono,Compania,Direccion, TCMunicipioId, Municipio}: valores que seran retornados
 */
exports.detallesId = (req, res) => {
    TipoPersona.findByPk(req.params.Id, {
        include: [{
            model: Persona,
            required: true
        }, {
            model: Municipio,
            required: true
        }],
    }).then(resp => {
        const resps = {
            id: resp.id,
            Nombres: resp.AD_Persona.Nombres,
            Apellidos: resp.AD_Persona.Apellidos,
            Nacimiento: resp.AD_Persona.Nacimiento,
            Identificacion: resp.AD_Persona.Identificacion,
            ADPersonaId: resp.ADPersonaId,
            Nit: resp.Nit,
            Telefono: resp.Telefono,
            Compania: resp.Compania,
            Direccion: resp.Direccion,
            TCMunicipioId: resp.TCMunicipioId,
            Municipio: resp.TC_Municipio.Nombre
        };
        res.status(200).json(resps);
    }).catch(err => {
        //console.log(err)
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del TipoPersona.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    TipoPersona.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Persona,
            required: true,
            where: {
                Nombres: {
                    [Op.like]: `%${req.params.Txt}%`,               
                }            
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
                    Persona: doc.AD_Persona.Nombres + " " + doc.AD_Persona.Apellidos,
                    Tipo: doc.Tipo,
                    Estado: doc.Estado,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt
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
 * @description: Resuelve una solicitud para obtener la carga de tipo persona.
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
            .on('data', (data) =>{
                idEmpresa = {TCEmpresaId: req.userData.TCEmpresaId};
                campos = Object.assign(data, idEmpresa);
                results.push(campos)
            })
            .on('end', () => {                
                results.forEach(function (fun) {
                    TipoPersona.create(fun);
                });
            });
            res.status(200).json(results)
    }
    catch (err) {
        res.status(500).json(err);
    }
};