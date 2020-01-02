/**
 * Modelo de bitacora
 * @name: m_bitacora
 * @author: Hector Felipe
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad bitacora.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de bitacora.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const SA_Bitacoras = sequelize.define('SA_Bitacoras', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        FechaHora: {
            type: Sequelize.DATE,
            required: 'Fecha y Hora es requerido',
            allowNull: false
        },
        Descripcion: {
            type: Sequelize.STRING
        },
        ADUsuarioId: {
            type: Sequelize.STRING
        },
        TCEmpresaId: {
            type: Sequelize.STRING
        },
        Ip: {
            type: Sequelize.STRING,
            allowNull: false,
            required: 'Ip es requerida',

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
    return SA_Bitacoras;
};