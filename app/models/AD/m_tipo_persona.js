/**
 * Modelo de tipo persona
 * @name: m_tipo_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad tipo persona.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de tipo persona.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */

module.exports = (sequelize, Sequelize) => {
    const AD_Tipos_Personas = sequelize.define('AD_Tipos_Personas', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Nit: {
            type: Sequelize.STRING
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
    return AD_Tipos_Personas;
};
