/**
 * Modelo de municipio
 * @name: m_municipio
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad municipio.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de municipio.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Municipios = sequelize.define('TC_Municipios', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        Codigo: {
            type: Sequelize.STRING
        },
        Nombre: {
            type: Sequelize.STRING,
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
    });
    return TC_Municipios;
};