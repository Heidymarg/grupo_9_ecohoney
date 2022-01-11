module.exports = function(sequelize, dataTypes) {
    let alias = "interesesDeUsuarios";
    let cols = {
        idUsr:{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull:true
        },
        id_interes: {type:dataTypes.INTEGER,
        notNull:true},
        primaryKey: true
    }

    let config  = {
        tableName:"interesesdeusuarios",
        timestamps:false
    }
    let interesesDeUsuarios = sequelize.define(alias, cols, config);
    
    return interesesDeUsuarios;  
}