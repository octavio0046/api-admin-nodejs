const jwt = require('jsonwebtoken');
const db = require('../config/db.config.js');
const Bitacora = db.Bitacora;
var ip = require('ip');


module.exports = (req, res, next) => {
    
       

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        data = {
            FechaHora: Date.now(),
            Descripcion: req.originalUrl + ' ' + req.method,
            Ip: ip.address(),
            TCEmpresaId: req.userData.TCEmpresaId,
            ADUsuarioId: req.userData.UserId
        };
        Bitacora.create(data)
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};