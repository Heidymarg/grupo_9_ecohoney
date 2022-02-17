module.exports = function( sequelize, dataTypes ) {
	let alias = "carritos";
			
	let cols = {
		id_carrito: { 
            type: dataTypes.INTEGER, 
            primaryKey: true, 
            autoincrement:true
        },
        idUsr: {
            type: dataTypes.INTEGER
        },        
        id_prod_en_carrito: { 
            type: dataTypes.INTEGER
        },
        cantidad : {
            type: dataTypes.INTEGER
        }
    }  

    let config = { tableName: "carrito", timestamps: false };
			
	let carrito = sequelize.define(alias, cols, config );

    carrito.associate = function(models) {
        carrito.belongsTo(models.usuarios, {
            as: "usuarios",
            foreignKey: "idUsr",
        });    
    }
    
	return carrito;	
}        