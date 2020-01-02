/**
 * Modelo de usuario
 * @name: m_usuario
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad usuario.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de usuario.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const AD_Usuarios = sequelize.define('AD_Usuarios', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        Nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        Clave: {
            type: Sequelize.STRING,
            allowNull: false
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
        Intentos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Reinicio: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return AD_Usuarios;
};