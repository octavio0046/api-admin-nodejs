/**
 * Modelo de spanish error
 * @name: m_spanish_error
 * @author: Smart Devs S.E
 * @version: 1.1
 * @description: Modelo donde se define los campos de la entidad spanish error.
 * Fecha: 18/09/2019
 */


/**
 * @description: Se definen los campos del modelo de spanish error.
 * @author: Smart Devs S.E
 * Fecha: 18/09/2019
 */
module.exports = (sequelize, Sequelize) => {
    const TC_Spanish_Errors = sequelize.define('TC_Spanish_Errors', {
        MensajeIngles: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        MensajeEspaniol: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Error pendiente de traducción, notifique al administrador"
        }
    });
    return TC_Spanish_Errors;
};