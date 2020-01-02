/**
 * Modelo de rol
 * @name: m_rol
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad rol.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de rol.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Roles = sequelize.define('SA_Roles', {
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
            type: Sequelize.STRING
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

    }, {
        name: {
            singular: "SA_Rol",
            plural: "SA_Roles"
        }
    });
    return SA_Roles;
};