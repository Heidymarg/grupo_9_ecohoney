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
            type: dataTypes.STRING(30),
        },
        id_perfil: {type:dataTypes.INTEGER,
            notNull:true
        },
        id_intereses: {type:dataTypes.INTEGER,
            notNull:true
        },
        password:{type: dataTypes.STRING(512),
        },
        id_carrito: {type:dataTypes.INTEGER
        },
        foto:{
            type: dataTypes.STRING(255)
        }
    }


    let config  = {
        tableName:"usuarios",
        timestamps:false
    }

    let usuario = sequelize.define(alias, cols, config);

    usuario.associate = function(models) {
        usuario.belongsTo(models.perfiles, {
            as:"perfiles",
            foreignKey: "id_perfil",
            allowNull: false
        });
    }

    usuario.associate = function(models) {
        usuario.belongsToMany(models.intereses, {
            through: "interesesDeUsuarios",
            foreignKey: "id_intereses",
            otherKey: 'id_Usr',
            timestamps: false
        });    
    }

    usuario.associate = function(models) {
        usuario.belongsTo(models.carrito, {
            as: "carrito",
            foreignKey: "id_carrito",
            allowNull: false            
        }) 
    }

    return usuario;  
} 

