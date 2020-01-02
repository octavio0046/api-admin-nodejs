/**
 * Modelo de modulo
 * @name: m_modulo
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad modulo.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de modulo.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Modulos = sequelize.define('SA_Modulos', {
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
        Icono: {
            type: Sequelize.STRING
        },
        Orden: {
            type: Sequelize.INTEGER
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
    return SA_Modulos;
};