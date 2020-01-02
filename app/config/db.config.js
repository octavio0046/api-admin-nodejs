/**
 * Configuracion para las relaciones de entidades del base de datos del proyecto
 * @name: db.config
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Archivo donde se configurara las relaciones de las entidades a utilizar en el proyecto.
 * Fecha: 18/09/2019
 */

 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.database,
    process.env.user,
    process.env.clave, {
        host: process.env.host,
        dialect: 'mysql'
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const ventas = require("../semillas/s_administracion");

/**
 * Rutas del Modulo de administracion
 */ 
db.Usuario = require('../models/AD/m_usuario')(sequelize, Sequelize);
db.Persona = require('../models/AD/m_persona')(sequelize, Sequelize);
db.Token = require('../models/AD/m_tokens')(sequelize, Sequelize);
db.TipoPersona = require('../models/AD/m_tipo_persona')(sequelize, Sequelize);
/**
 * Rutas del Modulo de super administracion
 */ 
db.Funcion = require('../models/SA/m_funcion')(sequelize, Sequelize);
db.DetalleFuncion = require('../models/SA/m_detalle_funcion')(sequelize, Sequelize);
db.Modulo = require('../models/SA/m_modulo')(sequelize, Sequelize);
db.Bitacora = require('../models/SA/m_bitacora')(sequelize, Sequelize);
db.Rol = require('../models/SA/m_rol')(sequelize, Sequelize);
db.Accion = require('../models/SA/m_accion')(sequelize, Sequelize);
db.RolFuncion = require('../models/SA/m_rol_funcion')(sequelize, Sequelize);
db.FuncionAccion = require('../models/SA/m_funcion_accion')(sequelize, Sequelize);
/**
 * Rutas del Modulo de catalogos
 */ 
db.Departamento = require('../models/TC/m_departamento')(sequelize, Sequelize);
db.Municipio = require('../models/TC/m_municipio')(sequelize, Sequelize);
db.SpanishError = require('../models/TC/m_spanish_error')(sequelize, Sequelize);
db.TcFuncion = require('../models/TC/m_funcion')(sequelize, Sequelize);
db.TipoLocalizador = require('../models/TC/m_tipo_localizador')(sequelize, Sequelize);

db.Empresa = require('../models/TC/m_empresa')(sequelize, Sequelize);
db.TipoPersonaHasFuncion = require('../models/TC/m_tipo_persona_has_funcion')(sequelize, Sequelize);
db.TipoPersonaHasLocalizador = require('../models/TC/m_tipo_persona_has_localizador')(sequelize, Sequelize);
db.EmpresaHasLocalizador = require('../models/TC/m_empresa_has_localizador')(sequelize, Sequelize);
db.UnidadNegocio = require('../models/TC/m_unidad_negocio')(sequelize, Sequelize);
db.GrupoTrabajo = require('../models/TC/m_grupo_trabajo')(sequelize, Sequelize);
db.GrupoTrabajoPersona =  require('../models/TC/m_grupo_trabajo_persona')(sequelize, Sequelize);
/**
 * Rutas del Modulo de Work Flow
 */ 
db.Carrera = require('../models/WF/m_carrera')(sequelize, Sequelize);
db.Curso = require('../models/WF/m_curso')(sequelize, Sequelize);
db.Grado = require('../models/WF/m_grado')(sequelize, Sequelize);
db.Horario = require('../models/WF/m_horario')(sequelize, Sequelize);
db.Jornada = require('../models/WF/m_jornada')(sequelize, Sequelize);
db.Seccion = require('../models/WF/m_seccion')(sequelize, Sequelize);
db.GradoAsignacionCurso = require('../models/WF/m_grado_asignacion_curso')(sequelize, Sequelize);
db.GradoAsignacion = require('../models/WF/m_grado_asignacion')(sequelize, Sequelize);
db.CursoHasProfesor = require('../models/WF/m_curso_has_profesor')(sequelize, Sequelize);
/**
 * Relaciones
 */ 
db.Modulo.hasMany(db.Funcion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Funcion.belongsTo(db.Modulo);
db.Funcion.hasMany(db.DetalleFuncion, { foreignKey: { name: 'SAFuncionId', allowNull: false, }, onDelete: 'RESTRICT' });
db.DetalleFuncion.belongsTo(db.Funcion);
db.Funcion.hasMany(db.RolFuncion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.RolFuncion.belongsTo(db.Funcion);
db.Rol.hasMany(db.RolFuncion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.RolFuncion.belongsTo(db.Rol);
db.Rol.hasMany(db.Usuario, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Usuario.belongsTo(db.Rol);
db.Funcion.hasMany(db.FuncionAccion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.FuncionAccion.belongsTo(db.Funcion);
db.Accion.hasMany(db.FuncionAccion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.FuncionAccion.belongsTo(db.Accion);
db.Departamento.hasMany(db.Municipio, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Municipio.belongsTo(db.Departamento);
db.Municipio.hasMany(db.TipoPersona, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.TipoPersona.belongsTo(db.Municipio);
db.Persona.hasMany(db.TipoPersona, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.TipoPersona.belongsTo(db.Persona);
db.TipoPersona.hasMany(db.Usuario, { foreignKey: { name: 'ADTipoPersonaId', allowNull: false, }, onDelete: 'RESTRICT' });
db.Usuario.belongsTo(db.TipoPersona,  { foreignKey: { name: 'ADTipoPersonaId', allowNull: false } });
db.TipoLocalizador.hasMany(db.TipoPersonaHasLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersonaHasLocalizador.belongsTo(db.TipoLocalizador);

// db.TipoPersona.hasMany(db.Empresa, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
// //RELACION TC TIPO PERSONA HAS FUNCION
// db.Empresa.belongsTo(db.TipoPersona);
db.TipoPersona.hasMany(db.TipoPersonaHasFuncion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersonaHasFuncion.belongsTo(db.TipoPersona);
db.TcFuncion.hasMany(db.TipoPersonaHasFuncion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersonaHasFuncion.belongsTo(db.TcFuncion);
//RELACION TC TIPO PERSONA HAS LOCALIZADOR
db.TipoPersona.hasMany(db.TipoPersonaHasLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersonaHasLocalizador.belongsTo(db.TipoPersona);
//RELACION TC EMPRESA HAS LOCALIZADOR
db.TipoLocalizador.hasMany(db.EmpresaHasLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.EmpresaHasLocalizador.belongsTo(db.TipoLocalizador);
db.Empresa.hasMany(db.EmpresaHasLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.EmpresaHasLocalizador.belongsTo(db.Empresa);
// RELACION TC UNIDAD NEGOCIO
db.TipoPersona.hasMany(db.UnidadNegocio, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.UnidadNegocio.belongsTo(db.TipoPersona);
db.Empresa.hasMany(db.UnidadNegocio, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.UnidadNegocio.belongsTo(db.Empresa);
db.Municipio.hasMany(db.UnidadNegocio, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.UnidadNegocio.belongsTo(db.Municipio);
// RELACION TC FUNCION GRUPO TRABAJO
db.TipoPersona.hasMany(db.GrupoTrabajo, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GrupoTrabajo.belongsTo(db.TipoPersona);
db.UnidadNegocio.hasMany(db.GrupoTrabajo, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GrupoTrabajo.belongsTo(db.UnidadNegocio);
// RELACION WF ASIGNACION GRADO
db.Seccion.hasMany(db.GradoAsignacion, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacion.belongsTo(db.Seccion);
db.Carrera.hasMany(db.GradoAsignacion, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacion.belongsTo(db.Carrera);
db.Jornada.hasMany(db.GradoAsignacion, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacion.belongsTo(db.Jornada);
db.Grado.hasMany(db.GradoAsignacion, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacion.belongsTo(db.Grado);
// RELACION WF ASIGNACION GRADO CURSO
db.Horario.hasMany(db.GradoAsignacionCurso, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacionCurso.belongsTo(db.Horario);
db.Curso.hasMany(db.GradoAsignacionCurso, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacionCurso.belongsTo(db.Curso);
// RELACION WF CURSO PROFESOR
db.Curso.hasMany(db.CursoHasProfesor, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.CursoHasProfesor.belongsTo(db.Curso);
db.TipoPersona.hasMany(db.CursoHasProfesor, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.CursoHasProfesor.belongsTo(db.TipoPersona);


// relacion grado-asignacion -> grado-asingacion-curso
db.GradoAsignacion.hasMany(db.GradoAsignacionCurso, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacionCurso.belongsTo(db.GradoAsignacion);

// grupo trabajo persona
db.Persona.hasMany(db.GrupoTrabajoPersona, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GrupoTrabajoPersona.belongsTo(db.Persona);
db.GrupoTrabajo.hasMany(db.GrupoTrabajoPersona, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GrupoTrabajoPersona.belongsTo(db.GrupoTrabajo);

// Relacion de empresas con modulo de administracion
db.Empresa.hasMany(db.Usuario, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Usuario.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Persona, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Persona.belongsTo(db.Empresa);

db.Empresa.hasMany(db.TipoPersona, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersona.belongsTo(db.Empresa);

//RElacion empresas con super administracion

db.Empresa.hasMany(db.Accion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Accion.belongsTo(db.Empresa);

// db.Empresa.hasMany(db.Bitacora, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
// db.Bitacora.belongsTo(db.Empresa);

db.Empresa.hasMany(db.DetalleFuncion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.DetalleFuncion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.FuncionAccion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.FuncionAccion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Funcion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Funcion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Modulo, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Modulo.belongsTo(db.Empresa);

db.Empresa.hasMany(db.RolFuncion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.RolFuncion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Rol, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Rol.belongsTo(db.Empresa);

//relacion de empresas con catalogos
db.Empresa.hasMany(db.Departamento, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Departamento.belongsTo(db.Empresa);

db.Empresa.hasMany(db.EmpresaHasLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.EmpresaHasLocalizador.belongsTo(db.Empresa);

db.Empresa.hasMany(db.TcFuncion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TcFuncion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.GrupoTrabajoPersona, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GrupoTrabajoPersona.belongsTo(db.Empresa);

db.Empresa.hasMany(db.GrupoTrabajo, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GrupoTrabajo.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Municipio, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Municipio.belongsTo(db.Empresa);

db.Empresa.hasMany(db.TipoLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoLocalizador.belongsTo(db.Empresa);

db.Empresa.hasMany(db.TipoPersonaHasFuncion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersonaHasFuncion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.TipoPersonaHasLocalizador, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.TipoPersonaHasLocalizador.belongsTo(db.Empresa);

db.Empresa.hasMany(db.UnidadNegocio, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.UnidadNegocio.belongsTo(db.Empresa);

//relacion de empresas con work
db.Empresa.hasMany(db.Carrera, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Carrera.belongsTo(db.Empresa);

db.Empresa.hasMany(db.CursoHasProfesor, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.CursoHasProfesor.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Curso, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Curso.belongsTo(db.Empresa);

db.Empresa.hasMany(db.GradoAsignacionCurso, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacionCurso.belongsTo(db.Empresa);

db.Empresa.hasMany(db.GradoAsignacion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.GradoAsignacion.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Grado, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Grado.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Horario, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Horario.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Jornada, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Jornada.belongsTo(db.Empresa);

db.Empresa.hasMany(db.Seccion, { foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
db.Seccion.belongsTo(db.Empresa);




if (process.env.resetDb == "Si") {
    ventas.sembraradmin(db);
}

module.exports = db;