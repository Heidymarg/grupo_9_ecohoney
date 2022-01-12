module.exports = function( sequelize, dataTypes )
		{
			let alias = "carritos";
			
			let cols = {
				id_carrito: { 
                    type: dataTypes.INTEGER, 
                    primaryKey: true, 
                    autoincrement:true
                },
                id_prod_en_carrito: { 
                    type: dataTypes.INTEGER, 
                   
                }
                  
            }  

			let config = { tableName: "carrito", timestamps: false };
			
			let carrito = sequelize.define(alias, cols, config );

            carrito.associate = function(models) {
                carrito.belongsTo(models.usuarios, {
                    // pueden haber varias relaciones seteadas
                    as: "usuarios",
                    foreignKey: "idUsr",
                    });    
            }
            carrito.associate = function(models) {
                carrito.hasMany(models.productos, {
                    // pueden haber varias relaciones seteadas
                    as: "productos",
                    foreignKey: "idPrd",
                    }) 
            }  


			return carrito;		
		}
