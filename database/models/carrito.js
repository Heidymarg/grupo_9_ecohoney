module.exports = function( sequelize, dataTypes ) {
	let alias = "carrito";
			
	let cols = {
		id_carrito: { 
            type: dataTypes.INTEGER, 
            primaryKey: true, 
            autoincrement:true
        },
                
        id_prod_en_carrito: { 
            type: dataTypes.INTEGER
        }
    }  

    let config = { tableName: "carrito", timestamps: false };
			
	let carrito = sequelize.define(alias, cols, config );

    carrito.associate = function(models) {
        carrito.hasMany(models.usuarios, {
            as: "usuarios",
            foreignKey: "idUsr",
        });    
    }
    
	return carrito;	
}        