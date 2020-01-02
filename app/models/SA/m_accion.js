/**
 * Modelo de accion
 * @name: m_accion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad accion.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de accion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Acciones = sequelize.define('SA_Acciones', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Nombre: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        Descripcion: {
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
    }, {
        name: {
            singular: "SA_Accion",
            plural: "SA_Acciones"
        }
    });
    return SA_Acciones;
};