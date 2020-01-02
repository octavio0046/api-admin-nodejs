/**
 * Modelo de persona
 * @name: m_persona
 * @author: Hector Felipe
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad persona.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const AD_Personas = sequelize.define("AD_Personas", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Apellidos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Identificacion: {
            type: Sequelize.STRING
        },
        Nacimiento: {
            type: Sequelize.DATE
        },
        Estado: {
            type: Sequelize.ENUM,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
            allowNull: false
        },
    });
    return AD_Personas;
};