module.exports = function(sequelize, dataTypes) {
    let alias = "usuarios";
    let cols = {
        idUsr:{ 
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremente: true,
            notNull:true
        },
        usuario:{
            type: dataTypes.STRING(30),
            notNull:true

        },
        email:{
            type: dataTypes.STRING(30)
        },
        id_perfil: {type:dataTypes.INTEGER,
        notNull:true},
         id_interes: {type:dataTypes.INTEGER,
        notNull:true},
        password:{type: dataTypes.STRING(10)}

    }
    let config  = {
        tableName:"usuarios",
        timestamps:false
    }
    let usuario = sequelize.define(alias, cols, config);
    usuario.associate = function(models) {
        usuario.belongsTo(models.perfiles, {
            as:"perfil",
            foreignKey: "id_perfil",
        });
    }

    usuario.associate = function(models) {
        usuario.belongsTo(models.intereses, {
            as: 'intereses',
            through: "interesesDeUsuarios",
            foreignKey: "id_intereses",
            otherKey: 'id_Usr',
            timestamps: false
            });    
    }
    usuario.associate = function(models) {
        usuario.belongsTo(models.intereses, {
            foreignKey: "id_intereses",
            through: "interesesDeUsuarios",
            });    
    }

    return usuario;  
} 

