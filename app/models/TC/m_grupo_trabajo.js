/**
 * Modelo de Funciones grupo de trabajo
 * @name: m_funcion_grupo_trabajo
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad Funciones grupo de trabajo
 * Fecha: 23/09/2019
 */


/**
 * @description: Se definen los campos del modelo de Funciones grupo de trabajo.
 * @author: Smart Devs S.E
 * Fecha: 23/09/2019
 */

module.exports = (sequelize, Sequelize) => {
    const TC_Grupos_Trabajos = sequelize.define('TC_Grupos_Trabajos', {
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
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        WebPage: {
            type: Sequelize.STRING
        },
        Telefono: {
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
    return TC_Grupos_Trabajos;
};
