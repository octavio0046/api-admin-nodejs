/**
 * Controlador de reportes
 * @name: smart-api-escuelas
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Controlador donde se define la logica de la entidad reportes.
 * Fecha: 27/11/2019
 */

 
const db = require('../../config/db.config.js');



/**
 * @description: Resuelve una solicitud para la obtencion de un reporte de resumen de datos
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTResumen = (req, res) => {
    
    db.sequelize.query("call RptResumen('" + req.userData.TCEmpresaId + "')").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err);
    });

};
/**
 * @description: Resuelve una solicitud para la obtencion de un reporte grupo de trabajo
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTGrupoTrabajo = (req, res) => {
    
    db.sequelize.query("call RptGrupoTrabajo").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err);
    });

};
/**
 * @description: Resuelve una solicitud para la obtencion de un reporte de resumen de jornadas y grado
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTJornadaGrado = (req, res) => {
    
    db.sequelize.query("call RptPemsaJornadaGrado").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err);
    });

};

/**
 * @description: Resuelve una solicitud para la obtencion de un reporte personas que son emprleados
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTPersonaEmpleado = (req, res) => {
    
    db.sequelize.query("call RptPersonasEmpleados").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err);
    });

};


exports.findRPTAsignaciones = (req, res) => {
    if (Array.isArray(req.body.WFJornadaId) && req.body.WFJornadaId.length >= 1) {
        req.body.WFJornadaId = req.body.WFJornadaId[0].id;
    } else {
        req.body.WFJornadaId = null;
    }

    if (Array.isArray(req.body.WFCarreraId) && req.body.WFCarreraId.length >= 1) {
        req.body.WFCarreraId = req.body.WFCarreraId[0].id;
    } else {
        req.body.WFCarreraId = null;
    }

    if (Array.isArray(req.body.WFGradoId) && req.body.WFGradoId.length >= 1) {
        req.body.WFGradoId = req.body.WFGradoId[0].id;
    } else {
        req.body.WFGradoId = null;
    }

    if (Array.isArray(req.body.WFSeccioneId) && req.body.WFSeccioneId.length >= 1) {
        req.body.WFSeccioneId = req.body.WFSeccioneId[0].id;
    } else {
        req.body.WFSeccioneId = null;
    }

    var IdJornada = req.body.WFJornadaId;
    var IdCarrera = req.body.WFCarreraId;
    var IdGrado = req.body.WFGradoId;
    var IdSeccion = req.body.WFSeccioneId;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (IdJornada != null) {
        IdJornada = "'" + IdJornada + "'";
    }

    if (IdCarrera != null) {
        IdCarrera = "'" + IdCarrera + "'";
    }

    if (IdGrado != null) {
        IdGrado = "'" + IdGrado + "'";
    }

    if (IdSeccion != null) {
        IdSeccion = "'" + IdSeccion + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }

    db.sequelize.query("call RptAsignacionGrado(" + IdJornada + ", " + IdCarrera + ", " + IdGrado + ", " + IdSeccion + ", " + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};
/**
 * @description: Resuelve una solicitud para la obtencion de un reporte personas que son emprleados
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTAsignacionesCursos = (req, res) => {
    
    if (Array.isArray(req.body.WFCursoId) && req.body.WFCursoId.length >= 1) {
        req.body.WFCursoId = req.body.WFCursoId[0].id;
    } else {
        req.body.WFCursoId = null;
    }

    if (Array.isArray(req.body.WFHorarioId) && req.body.WFHorarioId.length >= 1) {
        req.body.WFHorarioId = req.body.WFHorarioId[0].HorarioInicial;
    } else {
        req.body.WFHorarioId = null;
    }

    if (Array.isArray(req.body.Dias) && req.body.Dias.length >= 1) {
        req.body.Dias = req.body.Dias[0].Dia;
    } else {
        req.body.Dias = null;
    }


    var Dias = req.body.Dias;
    var HorarioInicial = req.body.WFHorarioId;
    var IdCurso =req.body.WFCursoId;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (Dias != null) {
        Dias = "'" + Dias + "'";
    }

    if (HorarioInicial != null) {
        HorarioInicial = "'" + HorarioInicial + "'";
    }


    if (IdCurso != null) {
        IdCurso = "'" + IdCurso + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }
    db.sequelize.query("call RptAsignacionGradoCurso(" + Dias + ", " + HorarioInicial + ", " + IdCurso + ", " + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};
/**
 * @description: Resuelve una solicitud para la obtencion de un reporte personas que son emprleados
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTCursosProfesores = (req, res) => {
    if (Array.isArray(req.body.WFCursoId) && req.body.WFCursoId.length >= 1) {
        req.body.WFCursoId = req.body.WFCursoId[0].id;
    } else {
        req.body.WFCursoId = null;
    }

    if (Array.isArray(req.body.ADTiposPersonaId) && req.body.ADTiposPersonaId.length >= 1) {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId[0].id;
    } else {
        req.body.ADTiposPersonaId = null;
    }


    var IdProfesor = req.body.ADTiposPersonaId;
    var IdCurso = req.body.WFCursoId;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (IdProfesor != null) {
        IdProfesor = "'" + IdProfesor + "'";
    }

    if (IdCurso != null) {
        IdCurso = "'" + IdCurso + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }

    db.sequelize.query("call RptCursoProfesor(" + IdCurso + ", " + IdProfesor + ", " + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};
/**
 * @description: Resuelve una solicitud para la obtencion de un reporte personas que son emprleados
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTTipoPersonaFuncion = (req, res) => {
    if (Array.isArray(req.body.TCFuncioneId) && req.body.TCFuncioneId.length >= 1) {
        req.body.TCFuncioneId = req.body.TCFuncioneId[0].id;
    } else {
        req.body.TCFuncioneId = null;
    }

    if (Array.isArray(req.body.ADTiposPersonaId) && req.body.ADTiposPersonaId.length >= 1) {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId[0].id;
    } else {
        req.body.ADTiposPersonaId = null;
    }

    var IdTipoPersona = req.body.ADTiposPersonaId;
    var IdFuncion = req.body.TCFuncioneId;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (IdTipoPersona != null) {
        IdTipoPersona = "'" + IdTipoPersona + "'";
    }

    if (IdFuncion != null) {
        IdFuncion = "'" + IdFuncion + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }

    db.sequelize.query("call RptTipoPersonaFuncion(" + IdTipoPersona + ", " + IdFuncion + ", " + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};

/**
 * @description: Resuelve una solicitud para la obtencion de un reporte personas que son emprleados
 * @author: Smart Devs S.E
 * Fecha: 02/10/2019
 * @param  {} req: solicitud a resolver
 * @param  {} res: respuesta a la solicitud dada
 */
exports.findRPTGrupoTrabajoFiltro = (req, res) => {
   
    if (Array.isArray(req.body.WFGrupoTrabajo) && req.body.WFGrupoTrabajo.length >= 1) {
        req.body.WFGrupoTrabajo = req.body.WFGrupoTrabajo[0].id;
    } else {
        req.body.WFGrupoTrabajo = null;
    }


    var IdGRupoTrabajo = req.body.WFGrupoTrabajo;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (IdGRupoTrabajo != null) {
        IdGRupoTrabajo = "'" + IdGRupoTrabajo + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }

    db.sequelize.query("call RptGrupoTrabajoFiltro(" + IdGRupoTrabajo + ", " + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};


exports.findRPTTipoPersonaLocalizador = (req, res) => {
    if (Array.isArray(req.body.TCTiposLocalizadoreId) && req.body.TCTiposLocalizadoreId.length >= 1) {
        req.body.TCTiposLocalizadoreId = req.body.TCTiposLocalizadoreId[0].id;
    } else {
        req.body.TCTiposLocalizadoreId = null;
    }

    if (Array.isArray(req.body.ADTiposPersonaId) && req.body.ADTiposPersonaId.length >= 1) {
        req.body.ADTiposPersonaId = req.body.ADTiposPersonaId[0].id;
    } else {
        req.body.ADTiposPersonaId = null;
    }


    var IdTipoPersona = req.body.ADTiposPersonaId;
    var IdLocalizador = req.body.TCTiposLocalizadoreId;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (IdTipoPersona != null) {
        IdTipoPersona = "'" + IdTipoPersona + "'";
    }

    if (IdLocalizador != null) {
        IdLocalizador = "'" + IdLocalizador + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }

    db.sequelize.query("call RptTipoPersonaLocalizador(" + IdTipoPersona + ", " + IdLocalizador + ", " + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};

exports.findRPTGrupoTrabajoEncargado = (req, res) => {
   
    if (Array.isArray(req.body.TCGruposTrabajoId) && req.body.TCGruposTrabajoId.length >= 1) {
        req.body.TCGruposTrabajoId = req.body.TCGruposTrabajoId[0].id;
    } else {
        req.body.TCGruposTrabajoId = null;
    }

    if (Array.isArray(req.body.TCUnidadesNegocioId) && req.body.TCUnidadesNegocioId.length >= 1) {
        req.body.TCUnidadesNegocioId = req.body.TCUnidadesNegocioId[0].id;
    } else {
        req.body.TCUnidadesNegocioId = null;
    }


    var IdGRupoTrabajo = req.body.TCGruposTrabajoId;
    var IdUnidadNegocio = req.body.TCUnidadesNegocioId;
    var IdEmpresa = req.userData.TCEmpresaId;

    if (IdGRupoTrabajo != null) {
        IdGRupoTrabajo = "'" + IdGRupoTrabajo + "'";
    }

    if (IdUnidadNegocio != null) {
        IdUnidadNegocio = "'" + IdUnidadNegocio + "'";
    }

    if (IdEmpresa != null) {
        IdEmpresa = "'" + IdEmpresa + "'";
    }

    db.sequelize.query("call RptGrupoTrabajoEncargado(" + IdGRupoTrabajo + ", " + IdUnidadNegocio + "," + IdEmpresa + ")").then(datos => {
        res.status(200).json(datos);
    }).catch(err => {
        res.status(500).json(err.message);
    });

};


