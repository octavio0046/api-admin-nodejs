/**
 * Modelo de empresa
 * @name: m_empresa
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad empresa.
 * Fecha: 19/09/2019
 */


/**
 * @description: Se definen los campos del modelo de empresa.
 * @author: Smart Devs S.E
 * Fecha: 19/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Empresas = sequelize.define('TC_Empresas', {
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
        RazonSocial: {
            type: Sequelize.STRING(45),
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
    return TC_Empresas;
};