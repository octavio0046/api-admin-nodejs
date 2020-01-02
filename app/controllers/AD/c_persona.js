/**
 * Controlador de persona
 * @name: c_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad persona.
 * Fecha: 18/09/2019
 */

 
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const Persona = db.Persona;
const Op = db.Sequelize.Op;
const csv = require('csv-parser');
const fs = require('fs');

/**
 * @description: Resuelve una solicitud para el almacenamiento de persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    Persona.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });

};
/**
 * @description: Resuelve una solicitud para la busqueda de persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    Persona.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        attributes: ['id',
            'Nombres',
            'Apellidos',
            'Identificacion',
            'createdAt',
            'updatedAt'],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};



/**
 * @description: Resuelve una solicitud para la busqueda por id de persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    Persona.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la modificacion de persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    Persona.update(req.body, { where: { id: req.params.Id } })
        .then(response => {
            res.status(200).json(response);
        }).catch(err => {
           res.status(500).json(err);
        });
};
/**
 * @description: Resuelve una solicitud para la eliminacion de persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    Persona.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por nombre completo de persona.
 * @author: Smart Devs S.E 
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, NombreCompleto}: valores retornados
 */
exports.nombreCompleto = (req, res) => {
    Persona.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        order: [['createdAt', 'DESC']],
        limit: 100
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    NombreCompleto: doc.Nombres + ' ' + doc.Apellidos
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });
};

exports.findAllEstado = (req, res) => {
    Persona.findAndCountAll({
        where: {
            Estado: 'Activo',
            TCEmpresaId: req.userData.TCEmpresaId
        },
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    NombreCompleto: doc.Nombres + ' ' + doc.Apellidos
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del Persona.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Persona.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId,
            [Op.or]: [{
                Nombres: {
                    [Op.like]: `%${req.params.Txt}%`
                }
            }, {
                Apellidos: {
                    [Op.like]: `%${req.params.Txt}%`
                }
            }]
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
 * @description: Resuelve una solicitud para obtener la carga de persona.
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
                    Persona.create(fun);
                });
            });
            res.status(200).json("exito")
    }
    catch (err) {
        res.status(500).json("error: ", err.message);
    }
};