module.exports = function( sequelize, dataTypes )
		{
			let alias = "lineas";
			
			let cols = {
				id_lineas: { 
                    type: dataTypes.INTEGER, 
                    primaryKey: true, 
                    autoincrement:true
                },

                nombre: { 
                        type: dataTypes.STRING
                }    
            }  

			let config = { tableName: "lineas", timestamps: false };
			
			let linea = sequelize.define(alias, cols, config );

            linea.associate = function(models) {
                linea.hasMany(models.productos, {
                    // pueden haber varias relaciones seteadas
                    as: "producto",
                    foreignKey: "idPrd",
                    });    
            }

			return linea;		
		}