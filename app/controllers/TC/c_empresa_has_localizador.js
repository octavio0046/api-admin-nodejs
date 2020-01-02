/**
 * Controlador de empresa_has_localizador
 * @name: c_empresa_has_localizador
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad empresa_has_localizador.
 * Fecha: 20/09/2019
 */


const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const EmpresaHasLocalizador = db.EmpresaHasLocalizador;
const Empresa = db.Empresa;
const Localizador = db.TipoLocalizador;
const Op = db.Sequelize.Op;
const csv = require('csv-parser');
const fs = require('fs');


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo empresa_has_localizador
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */

exports.create = (req, res) => {
    EmpresaHasLocalizador.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
           res.status(500).json(err);
        });

};

/**
 * @description: Resuelve una solicitud para la busqueda empresa_has_localizador
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    EmpresaHasLocalizador.findAndCountAll({
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
 * @description: Resuelve una solicitud para la busqueda de empresa_has_localizador por id
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    EmpresaHasLocalizador.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la actualizacion de un empresa_has_localizador
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    EmpresaHasLocalizador.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un empresa_has_localizador
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    EmpresaHasLocalizador.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Empresa Localizador.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    EmpresaHasLocalizador.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Empresa,
            required: true,
            where: {
                id: req.userData.TCEmpresaId,
                Nombre: {
                    [Op.like]: `%${req.params.Txt}%`,
                }
            }
        }
        ],
        limit: 100,
        order: [['createdAt', 'DESC']]
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
       res.status(500).json(err);
        console.log(err);
    });
};
/**
 * @description: Resuelve una solicitud para obtener la carga de empresa localizador.
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
                    EmpresaHasLocalizador.create(fun);
                });
            });
        res.status(200).json(results)
    }
    catch (err) {
        res.status(500).json(err);
    }
};

/**
 * @description: Resuelve una solicitud para realizar consulta de detalles de la entidad de empresa has localizador
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Nombre, createdAt, updatedAt}: valores a retornar
 */
exports.detalle = (req, res) => {
    EmpresaHasLocalizador.findAndCountAll({
        where: {
            TCEmpresaId: req.userData.TCEmpresaId
        },
        include: [{
            model: Empresa,
            required: true,
            where: {
                id: req.userData.TCEmpresaId
            }
        },
        {
            model: Localizador,
            required: true,
            where: {
                TCEmpresaId: req.userData.TCEmpresaId
            }
        }
    ]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre,
                    Descripcion: doc.Descripcion,
                    Localizador: doc.TC_Tipos_Localizadore.Nombre,
                    Empresa: doc.TC_Empresa.Nombre,
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
