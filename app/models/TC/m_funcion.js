/**
 * Modelo de funcion
 * @name: m_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad funcion.
 * Fecha: 19/09/2019
 */


/**
 * @description: Se definen los campos del modelo de funcion.
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Funciones = sequelize.define('TC_Funciones', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Nombre: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        Descripcion: {
            type: Sequelize.STRING(45),
            allowNull: true
        },
        Estado: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
        }
    });
    return TC_Funciones;
};