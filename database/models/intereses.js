module.exports = function( sequelize, dataTypes )
		{
			let alias = "intereses";
			
			let cols = {
				id_intereses: { 
                    type: dataTypes.INTEGER, 
                    primaryKey: true, 
                    autoincrement:true
                },

                nombre: { 
                        type: dataTypes.STRING
                }    
            }  

			let config = { tableName: "intereses", timestamps: false };
			
			let interes = sequelize.define(alias, cols, config );

            interes.associate = function(models) {
                interes.hasMany(models.productos, {
                    // pueden haber varias relaciones seteadas
                    as: "usuario",
                    foreignKey: "idUsr",
                    });    
            }
            interes.associate = function(models) {
                interes.belongsTo(models.usuarios, {
                    foreignKey: "id_Usr",
                    through: "interesesDeUsuarios"
                });    
            }

			return interes;		
		}
    
