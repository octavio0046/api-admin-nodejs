/**
 * Modelo de funcion
 * @name: m_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad funcion.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Funciones = sequelize.define('SA_Funciones', {
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
            allowNull: true
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
            singular: "SA_Funcion",
            plural: "SA_Funciones"
        }
    });
    return SA_Funciones;
};