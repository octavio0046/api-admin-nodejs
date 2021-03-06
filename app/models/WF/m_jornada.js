/**
 * Modelo de jornada
 * @name: m_jornada
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad jornada.
 * Fecha: 24/09/2019
 */


/**
 * @description: Se definen los campos del modelo de jornada.
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const WF_Jornadas = sequelize.define('WF_Jornadas', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Jornada: {
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
    return WF_Jornadas;
};