/**
 * Modelo de unidad de negocio
 * @name: m_unidad_negocio
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad unidad de negocio
 * Fecha: 23/09/2019
 */


/**
 * @description: Se definen los campos del modelo de unidad de negocio.
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 */

module.exports = (sequelize, Sequelize) => {
    const TC_Unidades_Negocio = sequelize.define('TC_Unidades_Negocio', {
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
        Direccion: {
            type: Sequelize.STRING
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
    });
    return TC_Unidades_Negocio;
};
