/**
 * Modelo de horario
 * @name: m_horario
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad horario.
 * Fecha: 24/09/2019
 */


/**
 * @description: Se definen los campos del modelo de horario.
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const WF_Horarios = sequelize.define('WF_Horarios', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        HorarioInicial: {
            type: Sequelize.STRING,
            allowNull: false
        },
        HorarioFinal: {
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
    return WF_Horarios;
};