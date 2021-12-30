module.exports = function( sequelize, dataTypes )
		{
			let alias = "usuarios";
			
			let cols = {
				idUrs: { 
                    type: dataTypes.INTEGER, 
                    primaryKey: true, 
                    autoincrement:true,
                    notNull: true

                },

                usuario: { 
                        type: dataTypes.STRING(30)
                },
                email:{type: dataTypes.STRING(30), notNull: true},
                id_perfil:{type: dataTypes.STRING(45), notNull: true},
                id_intereses:{type: dataTypes.INTEGER, notNull: true},
                password:{type: dataTypes.STRING(10), notNull: true}

            }  


			let config = { tableName: "usuarios", timestapms: false };
			
			let usuario = sequelize.define(alias, cols, config );

            usuario.associate = function(models) {
                usuario.hasMany(models.intereses, {
                    // pueden haber varias relaciones seteadas
                    as: "interes",
                    foreignKey: "id_intereses",
                    });    
            }

			return usuario;		
		}