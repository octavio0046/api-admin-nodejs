/**
 * Modelo de empresa_has_localizador
 * @name: m_empresa_has_localizador
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad empresa_has_localizador.
 * Fecha: 20/09/2019
 */


/**
 * @description: Se definen los campos del modelo de empresa_has_localizador.
 * @author: Smart Devs S.E
 * Fecha: 20/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Empresas_has_TC_Localizadores = sequelize.define('TC_Empresas_has_TC_Localizadores', {
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
        }
    }, {
        name: {
            singular: "TC_Empresa_has_TC_Localizador",
            plural: "TC_Empresas_has_TC_Localizador"
        }
    });
    return TC_Empresas_has_TC_Localizadores;
};