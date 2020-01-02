/**
 * Controlador de persona
 * @name: c_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad persona.
 * Fecha: 18/09/2019
 */


const aws = require('aws-sdk');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require('generate-password');
const db = require('../../config/db.config.js');
const SpanishError = require('../TC/c_spanish_error');
const Usuario = db.Usuario;
const Persona = db.Persona;
const TipoPersona = db.TipoPersona;
const Token = db.Token;
const Rol = db.Rol;
const Op = db.Sequelize.Op;
const csv = require('csv-parser');
const fs = require('fs');

/**
 * @description: Credenciales para la configuracion de AWS.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
aws.config.update({
    secretAccessKey: process.env.IAM_USER_SECRET,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.IAM_USER_KEY,

});
/**
 * @description: Resuelve una solicitud para el reinicio de una constrasena.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @param  {} next: 
 */
exports.reinicio = (req, res, next) => {

    var password = generator.generate({
        length: 15,
        numbers: true
    });

    var params = {
        Destination: {
            ToAddresses: [req.body.Email]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: "Tu nueva contraeña es:  " + password
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Reinicio de Password'
            }
        },
        Source: process.env.EmailReinicio
    };

    Usuario.findOne({
        where: { Email: req.body.Email }
    }).then(user => {
        if (user) {
            Usuario.update({
                Clave: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
                Reinicio: true
            }, {
                where: { id: user.id }
            }).then(respp => {
                var sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
                sendPromise.then(
                    function (data) {
                        res.status(200).json({
                            message: data,
                            status: "Exito"
                        });
                    }).catch(
                        function (err) {
                            res.status(500).json(err);
                        });
            }).catch(
                function (err) {
                    res.status(500).json(err);
                });
        } else {
            res.status(200).json({
                message: "No esta registrado: " + req.body.Email,
                status: "Error"
            });
        }
    }).catch(err => {
        res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para que el usuario pueda ingresar.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @param  {} next: 
 * @return {res}: valor a retornar
 */
exports.user_login = (req, res, next) => {
    Usuario.findOne({
        where: { Email: req.body.Email }
    }).then(user => {
        if (user) {
            bcrypt.compare(req.body.Clave, user.Clave, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        Email: user.Email,
                        UserId: user.id,
                        SARolId: user.SARolId,
                        Reinicio: user.Reinicio,
                        TCEmpresaId: user.TCEmpresaId,
                        TipoPersonaId: user.ADTipoPersonaId

                    },
                        process.env.JWT_KEY, { expiresIn: process.env.TTEXPIRA + "h" });
                    insetatoken(token, user.id);
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        } else {
            res.status(404).json({ message: 'Auth failed' });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la creacion de un token.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} token: solicita un valor Token
 * @param  {} usuarioId: solicita un valor tipo usuarioId
 * @return {boolean}: valor a retornar (true | false)
 */
function insetatoken(token, usuarioId) {
    try {
        Token.create({
            Token: token,
            ADUsuarioId: usuarioId
        });

        return true;
    } catch (error) {
        return false;
    }
}
/**
 * @description: Resuelve una solicitud para el usuario que ya ingreso al sistema.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.user_signup = (req, res) => {
    req.body.Clave = bcrypt.hashSync(req.body.Clave, bcrypt.genSaltSync(8));
    Usuario.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            //res.status(200).json(err);
            res.status(500).json(err);

        });
};
/**
 * @description: Resuelve una solicitud para ver  el nombre completo de la persona que esta relacionada con el usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Persona}: valores a retornar.
 */
exports.persona = (req, res) => {
    TipoPersona.findAndCountAll({
        include: [{
            model: Persona,
            required: true
        }],
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Persona: doc.AD_Persona.Nombres + " " + doc.AD_Persona.Apellidos
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
    });
};

exports.findAllEstado = (req, res) => {
    console.log(req.userData.TCEmpresaId);
    TipoPersona.findAndCountAll({
        include: [{
            model: Persona,
            required: true
        }],
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
                    Persona: doc.AD_Persona.Nombres + " " + doc.AD_Persona.Apellidos
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para crear el perfil de la persona que esta relacionada con el usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.perfil = (req, res) => {
    TipoPersona.findOne({
        include: [{
            model: Persona,
            required: true,
            attributes: ['Nombres', 'Apellidos']
        },
        {
            model: Usuario,
            required: true,
            include: [{
                model: Rol,
                required: true,
                attributes: ['Nombre']
            }],
            attributes: ['Nombre', 'Email'],
            where: { id: req.params.Id }
        }],
        attributes: ['Nit']
    }).then(response => {
        const resp = {
            Nit: response.Nit,
            Persona: response.AD_Persona.Nombres + ' ' + response.AD_Persona.Apellidos,
            Usuario: response.AD_Usuario.Nombre,
            Email: response.AD_Usuario.Email,
            Rol: response.AD_Usuario.SA_Rol.Nombre
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
        //res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la creacion del usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.create = (req, res) => {
    var password = generator.generate({
        length: 15,
        numbers: true
    });

    var params = {
        Destination: {
            ToAddresses: [req.body.Email]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: "Tu contraseña contraeña es:  " + password
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Bienvenida a Escuelas'
            }
        },
        Source: process.env.EmailReinicio
    };

    var sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
    sendPromise.then();
    if (Array.isArray(req.body.SARolId)) {
        req.body.SARolId = req.body.SARolId[0].id;
    } else {
        req.body.SARolId = req.body.SARolId;
    }

    if (Array.isArray(req.body.ADTipoPersonaId)) {
        req.body.ADTipoPersonaId = req.body.ADTipoPersonaId[0].id;
    } else {
        req.body.ADTipoPersonaId = req.body.ADTipoPersonaId;
    }
    req.body.Clave = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    // req.body.SARolId = req.body.SARolId[0].id;
    // req.body.ADTipoPersonaId = req.body.ADTipoPersonaId[0].id;
    Usuario.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            res.status(500).json(err);
        });
};

/**
 * @description: Resuelve una solicitud para la busqueda de usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findAll = (req, res) => {
    Usuario.findAndCountAll({
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
 * @description: Resuelve una solicitud para ver los usuarios que no tienen ningun rol asignado.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 * @returns {id, Nombre}: valores a retornar.
 */
exports.noasignados = (req, res) => {
    Usuario.findAndCountAll({
        where: {
            '$AD_Usuarios.SARolId$': null,
            Estado: 'Activo'
        },
        include: [{
            model: Rol,
            required: false
        }]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * @description: Resuelve una solicitud para la busqueda por id del usuario
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findById = (req, res) => {
    Usuario.findAll({
        include: [{
            model: Rol,
            require: true,
        },
        {
            model: TipoPersona,
            require: true,
            include: [{
                model: Persona, require: true
            }]
        }],
        where: { id: req.params.Id },
        plain: true
    }).then(response => {
        const resp = {
            Nombre: response.Nombre,
            Clave: response.Clave,
            Email: response.Email,
            Intentos: response.Intentos,
            Reinicio: response.Reinicio,
            Estado: response.Estado,
            TCEmpresaId: response.TCEmpresaId,
            ADTipoPersonaId: [{
                id: response.AD_Tipos_Persona.id,
                Persona: response.AD_Tipos_Persona.AD_Persona.Nombres + ' ' + response.AD_Tipos_Persona.AD_Persona.Apellidos,
                Tipo: response.AD_Tipos_Persona.Tipo,
                createdAt: response.AD_Tipos_Persona.createdAt,
                updatedAt: response.AD_Tipos_Persona.updatedAt
            }],
            SARolId: [{
                id: response.SA_Rol.id,
                Nombre: response.SA_Rol.Nombre,
                Descripcion: response.SA_Rol.Descripcion,
                createdAt: response.SA_Rol.createdAt,
                updatedAt: response.SA_Rol.updatedAt,
            }],
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
 * @description: Resuelve una solicitud para la actualizacion del usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.update = (req, res) => {
    if (Array.isArray(req.body.SARolId)) {
        req.body.SARolId = req.body.SARolId[0].id;
    } else {
        req.body.SARolId = req.body.SARolId;
    }

    if (Array.isArray(req.body.ADTipoPersonaId)) {
        req.body.ADTipoPersonaId = req.body.ADTipoPersonaId[0].id;
    } else {
        req.body.ADTipoPersonaId = req.body.ADTipoPersonaId;
    }
    
    if (req.body.Clave != null) {
        req.body.Clave = bcrypt.hashSync(req.body.Clave, bcrypt.genSaltSync(8));
    }
    Usuario.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para el usuario que la eliminacion del usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.delete = (req, res) => {
    const id = req.params.Id;
    Usuario.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};
/**
 * @description: Resuelve una solicitud para la busqueda por clausula like del Usuario.
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */


exports.findLike = (req, res) => {
    Usuario.findAndCountAll({
        where:
        {
            [Op.or]: [{
                Nombre: {
                    [Op.like]: `%${req.params.Txt}%`
                }
            }, {
                Email: {
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
 * @description: Resuelve una solicitud para obtener la carga de Usuario.
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
                    Usuario.create(fun);
                });
            });
        res.status(200).json(results)
    }
    catch (err) {
        res.status(500).json(err);
    }
};
