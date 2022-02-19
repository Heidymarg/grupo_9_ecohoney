module.exports = function(sequelize, dataTypes) {
    let alias = "interesesDeUsuarios";
    let cols = {
        id_Usr:{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull:true
        },
            id_interes: {type:dataTypes.INTEGER,
            primaryKey: true,
            notNull:true},
    }

    let config  = {
        tableName:"interesesdeusuarios",
        timestamps:false
    }

    let interesesDeUsuarios = sequelize.define(alias, cols, config);

    return interesesDeUsuarios;  
} 

