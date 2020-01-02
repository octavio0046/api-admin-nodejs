/**
 * Archivo principal del proyecto
 * @name: app
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Archivo principal del proyecto donde se inicia la configuracion y se establecen las rutas que apuntan a las acciones establecidas en los controladores.
 * Fecha: 18/09/2019
 */


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*var whitelist = ['localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));*/


//app.use(cors({origin: true, credentials: true}));
/**
 * Rutas del Modulo de administracion
 */ 
const RouteUsuario = require('./app/routes/AD/r_usuario');
const RoutePersona = require('./app/routes/AD/r_persona');
const RouteTipoPersona = require('./app/routes/AD/r_tipo_persona');
/**
 * Rutas del Modulo de super administracion
 */ 
const RouteRol = require('./app/routes/SA/r_rol');
const RouteFuncion = require('./app/routes/SA/r_funcion');
const RouteDetalleFuncion = require('./app/routes/SA/r_detalle_funcion');
const RouteRolFuncion = require('./app/routes/SA/r_rol_funcion');
const RouteFuncionAccion = require('./app/routes/SA/r_funcion_accion');
const RouteModulo = require('./app/routes/SA/r_modulo');
const RouteBitacora = require('./app/routes/SA/r_bitacora');
const RouteAccion = require('./app/routes/SA/r_accion');
/**
 * Rutas del Modulo de catalogos
 */ 
const RouteMunicipio = require('./app/routes/TC/r_municipio');
const RouteDepartamento = require('./app/routes/TC/r_departamento');
const RouteTcFuncion = require ('./app/routes/TC/r_funcion');
const RouteTipoLocalizador = require ('./app/routes/TC/r_tipo_localizador');

const RouteEmpresa = require ('./app/routes/TC/r_empresa');
const RouteTipoPersonaHasFuncion = require ('./app/routes/TC/r_tipo_persona_has_funcion');
const RouteTipoPersonaHasLocalizador = require ('./app/routes/TC/r_tipo_persona_has_localizador');
const RouteEmpresaHasLocalizador = require ('./app/routes/TC/r_empresa_has_localizador');
const RouteUnidadNegocio = require ('./app/routes/TC/r_unidad_negocio');
const RouteGrupoTrabajo = require ('./app/routes/TC/r_grupo_trabajo');
const RouteGrupoTrabajoPersona = require ('./app/routes/TC/r_grupo_trabajo_persona');
/**
 * Rutas del Modulo de Work Flow
 */ 
const RouteGrado = require ('./app/routes/WF/r_grado');
const RouteHorario = require ('./app/routes/WF/r_horario');
const RouteJornada = require ('./app/routes/WF/r_jornada');
const RouteCurso = require ('./app/routes/WF/r_curso');
const RouteSeccion = require ('./app/routes/WF/r_seccion');
const RouteCarrera = require ('./app/routes/WF/r_carrera');
const RouteGradoAsignacionCurso = require ('./app/routes/WF/r_grado_asignacion_curso');
const RouteGradoAsignacion = require ('./app/routes/WF/r_grado_asignacion');
const RouteCursoHasProfesor = require ('./app/routes/WF/r_curso_has_profesor');
/**
 * Rutas del Modulo de Reportes
 */ 
const RouteReporte = require ('./app/routes/RP/r_reportes');
/**
 * Configuracion de swagger
 */

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/**
 * Rutas del Modulo de administracion
 */ 
app.use('/usuarios', RouteUsuario);
app.use('/personas', RoutePersona);
/**
 * Rutas del Modulo de super administracion
 */ 
app.use('/roles', RouteRol);
app.use('/funciones', RouteFuncion);
app.use('/detalles-funciones', RouteDetalleFuncion);
app.use('/roles-funciones', RouteRolFuncion);
app.use('/funciones-acciones', RouteFuncionAccion);
app.use('/modulos', RouteModulo);
app.use('/bitacoras', RouteBitacora);
app.use('/acciones', RouteAccion);
/**
 * Rutas del Modulo de catalogos
 */ 
app.use('/municipios', RouteMunicipio);
app.use('/departamentos', RouteDepartamento);
app.use('/tipos-personas', RouteTipoPersona);
app.use('/tc-funciones', RouteTcFuncion);
app.use('/tipos-localizadores', RouteTipoLocalizador);

app.use('/empresas', RouteEmpresa);
app.use('/tipos-persona-has-funcion', RouteTipoPersonaHasFuncion);
app.use('/tipos-persona-has-localizador', RouteTipoPersonaHasLocalizador);
app.use('/empresas-has-localizador', RouteEmpresaHasLocalizador);
app.use('/unidades-negocio', RouteUnidadNegocio);
app.use('/grupos-trabajo', RouteGrupoTrabajo);
app.use('/grupos-trabajo-personas', RouteGrupoTrabajoPersona);
/**
 * Rutas del Modulo de Work Flow
 */ 
app.use('/grados', RouteGrado);
app.use('/horarios', RouteHorario);
app.use('/jornadas', RouteJornada);
app.use('/cursos', RouteCurso);
app.use('/secciones', RouteSeccion);
app.use('/carreras', RouteCarrera);
app.use('/grados-asignaciones-cursos', RouteGradoAsignacionCurso);
app.use('/grados-asignaciones', RouteGradoAsignacion);
app.use('/cursos-has-profesores', RouteCursoHasProfesor)
/**
 * Rutas del Modulo de reportes
 */ 
app.use('/reportes', RouteReporte);
/**
 * @description: Se resuelve un estatus de error 404.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} req
 * @param  {} res
 * @param  {} net
 */
app.use((req, res, net) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});
/**
 * @description: Se resuelve un estatus de error 500.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 * @param  {} error
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;