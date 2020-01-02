/**
 * Controlador de Unidad de Negocio
 * @name: c_UnidadNegocio
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad Unidad de Negocio.
 * Fecha: 23/09/2019
 */


const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const UnidadNegocio = db.UnidadNegocio;
const Empresa = db.Empresa;
const Municipio = db.Municipio;
const TipoPersona = db.TipoPersona;
const Op = db.Sequelize.Op;


/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo UnidadNegocio
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    if (Array.isArray(req.body.ADTiposPersonaId)) {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId[0].id;
    } else {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId;
    }

    if (Array.isArray(req.body.TCMunicipioId)) {
        req.body.TCMunicipioId = req.body.TCMunicipioId[0].id;
    } else {
        req.body.TCMunicipioId = req.body.TCMunicipioId;
    }

    if (Array.isArray(req.body.TCEmpresaId)) {
        req.body.TCEmpresaId = req.body.TCEmpresaId[0].id;
    } else {
        req.body.TCEmpresaId = req.body.TCEmpresaId;
    }

    UnidadNegocio.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para el almacenamiento de un nuevo UnidadNegocio
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    UnidadNegocio.findAndCountAll({
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
 * @description: Resuelve una solicitud para la busqueda por estado en UnidadNegocio
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAllEstado = (req, res) => {
    UnidadNegocio.findAndCountAll({
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
 * @description: Resuelve una solicitud para la busqueda por id de un UnidadNegocio
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
// exports.findById = (req, res) => {
//     UnidadNegocio.findByPk(req.params.Id).then(response => {
//         res.status(200).json(response);
//     }).catch(err => {
//        res.status(500).json(err);
//     });
// };
exports.findById = (req, res) => {
    UnidadNegocio.findAll({
        include: [
        {
            model: TipoPersona,
            require: true,
        }
        ],
        where: { id: req.params.Id },
        plain: true
    }).then(response => {
        const resp = {
            Nombre: response.Nombre,
            Direccion: response.Direccion,
            Descripcion: response.Descripcion,
            Estado: response.Estado,
            TCEmpresaId: response.TCEmpresaId,
            TCMunicipioId: response.TCMunicipioId,
            ADTiposPersonaId: [response.AD_Tipos_Persona],
            createdAt: response.createdAt,
            updatedAt: response.updatedAt
        }
        res.status(200).json(resp);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la actualizacion de datos de un UnidadNegocio
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {

    if (Array.isArray(req.body.ADTiposPersonaId)) {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId[0].id;
    } else {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId;
    }
    if (Array.isArray(req.body.TCMunicipioId)) {
        req.body.TCMunicipioId = req.body.TCMunicipioId[0].id;
    } else {
        req.body.TCMunicipioId = req.body.TCMunicipioId;
    }

    if (Array.isArray(req.body.TCEmpresaId)) {
        req.body.TCEmpresaId = req.body.TCEmpresaId[0].id;
    } else {
        req.body.TCEmpresaId = req.body.TCEmpresaId;
    }
    UnidadNegocio.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la eliminacion de un UnidadNegocio
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    UnidadNegocio.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like de Unidad Negocio.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    UnidadNegocio.findAndCountAll({
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