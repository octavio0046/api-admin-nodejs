function sembraradmin(db) {
    //force: true will drop the table if it already exists
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Creado exitosamente");
        // db.Departamento.create({ Nombre: "Jutiapa" })
        //     .then(departamento => {
        //         db.Municipio.create({ Nombre: "Asunción Mita", TCDepartamentoId: departamento.dataValues.id })
        //     });
    }).catch(error => {
        console.log(error.message);
    });
}

module.exports = {
    "sembraradmin": sembraradmin
};