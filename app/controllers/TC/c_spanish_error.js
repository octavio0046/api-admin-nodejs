/**
 * Controlador para la traduccion de errores al español
 * @name: c_spanish Error
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad spanish error.
 * Fecha: 18/09/2019
 */


const db = require('../../config/db.config.js');
const SpanishError = db.SpanishError;


/**
 * @description: Resuelve una solicitud para el almacenamiento de la traduccion al español de un error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {

    SpanishError.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            res.status(500).json({ error: err });
        });
};
/**
 * @description: Resuelve una solicitud para la busqueda de la traduccion al español de un error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    SpanishError.findAndCountAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};

/**
 * @description: Resuelve una solicitud para la busqueda por id de la traduccion al español de un error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    SpanishError.findByPk(req.params.Id).then(response => {
        res.status(200).json({ status: "Error", mensaje: response.MensajeEspaniol });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};
/**
 * @description: Resuelve una solicitud para la actualización de la traduccion al español de un error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    SpanishError.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};
/**
 * @description: Resuelve una solicitud para la eliminación de la traduccion al español de un error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    SpanishError.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};
/**
 * @description: Resuelve una solicitud para resolver la busqueda de la traduccion al español de un error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.resolver = (req, res) => {
    SpanishError.findByPk(req.name)
        .then(spanisherror => {
            if (spanisherror) {
                res.status(200).json({ codigo: 500, status: "Error", mensaje: spanisherror.MensajeEspaniol });
            } else {
                SpanishError.create({
                    MensajeIngles: req.name,
                    MensajeEspaniol: "Error: " + req.name + " pendiente de traducción, notifique al administrador"
                });
                res.status(200).json({ codigo: 500, status: "Error", mensaje: "Error " + req.name + " pendiente de traducción, notifique al administrador" });
            }
        });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del SpanishError.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    SpanishError.findAndCountAll({
        where: {
            MensajeIngles: {
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