/**
 * Modelo de rol_funcion
 * @name: m_rol_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad rol_funcion.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de rol_funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Roles_Funciones = sequelize.define('SA_Roles_Funciones', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        }
    }, {
        name: {
            singular: "SA_Roles_Funcion",
            plural: "SA_Roles_Funciones"
        }
    });
    return SA_Roles_Funciones;
};