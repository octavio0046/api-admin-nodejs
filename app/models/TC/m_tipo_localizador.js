/**
 * Modelo de tipo_localizador
 * @name: m_tipo_localizador
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad tipo_localizador.
 * Fecha: 19/09/2019
 */


/**
 * @description: Se definen los campos del modelo de tipo_localizador.
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Tipos_Localizadores = sequelize.define('TC_Tipos_Localizadores', {
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
            allowNull: false,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
        }
    });
    return TC_Tipos_Localizadores;
};