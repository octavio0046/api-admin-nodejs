/**
 * Modelo de curso_has_profesor
 * @name: m_curso_has_profesor
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad curso_has_profesor.
 * Fecha: 30/09/2019
 */


/**
 * @description: Se definen los campos del modelo de curso_has_profesor.
 * @author: Smart Devs S.E
 * Fecha: 30/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const WF_Cursos_Has_Profesores = sequelize.define('WF_Cursos_Has_Profesores', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
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
    return WF_Cursos_Has_Profesores;
};