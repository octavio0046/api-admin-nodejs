/**
 * Modelo de detalle_funcion
 * @name: m_detalle_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad detalle_funcion.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de detalle_funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Detalles_funciones = sequelize.define('SA_Detalles_funciones', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Ruta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Orden: {
            type: Sequelize.INTEGER,
            allowNull: false
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
    }, {
        name: {
            singular: "SA_Detalles_Funcion",
            plural: "SA_Detalles_funciones"
        }
    });
    return SA_Detalles_funciones;
};