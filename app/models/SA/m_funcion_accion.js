/**
 * Modelo de funcion_accion
 * @name: m_funcion_accion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad funcion_accion.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de funcion_accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Funciones_Acciones = sequelize.define('SA_Funciones_Acciones', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        }
    }, {
        name: {
            singular: "SA_Funciones_Accion",
            plural: "SA_Funciones_Acciones"
        }
    });
    return SA_Funciones_Acciones;
};