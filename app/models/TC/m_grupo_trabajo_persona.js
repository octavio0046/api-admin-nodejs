/**
 * Modelo de grupo_trabajo_persona
 * @name: m_grupo_trabajo_persona
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad grupo_trabajo_persona.
 * Fecha: 20/09/2019
 */


/**
 * @description: Se definen los campos del modelo de grupo_trabajo_persona.
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Grupos_Trabajos_AD_Personas = sequelize.define('TC_Grupos_Trabajos_AD_Personas', {
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
            allowNull: false,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
        },
    }, {
        name: {
            singular: "TC_Grupo_Trabajo_AD_Persona",
            plural: "TC_Grupos_Trabajos_AD_Personas"
        }
    });
    return TC_Grupos_Trabajos_AD_Personas;
};