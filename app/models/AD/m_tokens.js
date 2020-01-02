/**
 * Modelo de tokens
 * @name: m_tokens
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad tokens.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de tokens.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const AD_Tokens = sequelize.define('AD_Tokens', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Token: {
            type: Sequelize.STRING(500),
            allowNull: false,
            unique: true,
            required: 'Token es requerida',
        },
        Usuario: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        Estado: {
            type: Sequelize.ENUM,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
            allowNull: false
        }
    });
    return AD_Tokens;
};