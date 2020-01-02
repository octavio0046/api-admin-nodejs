/**
 * Modelo de grado
 * @name: m_grado
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad grado.
 * Fecha: 24/09/2019
 */


/**
 * @description: Se definen los campos del modelo de grado.
 * @author: Smart Devs S.E
 * Fecha: 24/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const WF_Grados = sequelize.define('WF_Grados', {
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
    return WF_Grados;
};