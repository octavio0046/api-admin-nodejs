/**
 * Modelo de carrera
 * @name: m_carrera
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad seccion.
 * Fecha: 24/09/2019
 */


/**
 * @description: Se definen los campos del modelo de carrera.
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const WF_Carreras = sequelize.define('WF_Carreras', {
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
    return WF_Carreras;
};