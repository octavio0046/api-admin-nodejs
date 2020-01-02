/**
 * Modelo de grado_asignacion_curso
 * @name: m_grado_asignacion_curso
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad grado_asignacion_curso.
 * Fecha: 24/09/2019
 */


/**
 * @description: Se definen los campos del modelo de grado_asignacion_curso.
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const WF_Grados_Asignaciones_Cursos = sequelize.define('WF_Grados_Asignaciones_Cursos', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Descripcion: {
            type: Sequelize.STRING,
        },
        Dias: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
                'Sabado',
                'Domingo'
            ],
            defaultValue: 'Lunes',
        },
        Estado: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
        }
    });
    return WF_Grados_Asignaciones_Cursos;
};