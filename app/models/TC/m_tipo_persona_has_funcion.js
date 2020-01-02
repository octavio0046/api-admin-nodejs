/**
 * Modelo de tipo_persona_has_funcion
 * @name: m_tipo_persona_has_funcion
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad tipo_persona_has_funcion.
 * Fecha: 19/09/2019
 */


/**
 * @description: Se definen los campos del modelo de tipo_persona_has_funcion.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Tipos_Personas_has_TC_Funciones = sequelize.define('TC_Tipos_Personas_has_TC_Funciones', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
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
            singular: "TC_Tipos_Personas_has_TC_Funcion",
            plural: "TC_Tipos_Personas_has_TC_Funcion"
        }
    });
    return TC_Tipos_Personas_has_TC_Funciones;
};