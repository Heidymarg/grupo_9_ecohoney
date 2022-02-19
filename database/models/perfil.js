module.exports = function( sequelize, dataTypes )
		{
			let alias = "perfiles";
			
			let cols = {
				id_perfil: { 
                    type: dataTypes.INTEGER, 
                    primaryKey: true, 
                    autoincrement:true
                },

                nombre: { 
                        type: dataTypes.STRING
                }    
            }  

			let config = { tableName: "perfiles", timestamps: false };
			
			let perfil = sequelize.define(alias, cols, config );

            perfil.associate = function(models) {
                perfil.hasMany(models.usuarios, {
                    as: "usuarios",
                    foreignKey: "id_perfil",
                    allowNull: false,
                    });    
            }

			return perfil;		
		}
