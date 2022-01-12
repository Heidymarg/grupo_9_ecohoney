module.exports = function( sequelize, dataTypes ) {
	let alias = "productos";
			
	let cols = {
		idPrd: { 
        type: dataTypes.INTEGER, 
        primaryKey: true, 
        autoincrement:true
    },

    nombre: { 
        type: dataTypes.STRING
    },

        codigo: {type: dataTypes.STRING},
        descripcion: {type: dataTypes.STRING(250)},
        id_lineas: {type: dataTypes.INTEGER},
        precio: {type: dataTypes.DECIMAL},
        bonif: {type: dataTypes.DECIMAL},
        foto: {type: dataTypes.STRING(50)},
        cantidad: {type: dataTypes.INTEGER}   
    }  

	let config = { tableName: "productos", timestapms: false };
			
	let producto = sequelize.define(alias, cols, config );

    producto.associate = function(models) {
        producto.belongsTo(models.lineas, {
            as: "linea",
            foreignKey: "id_lineas",
        });    
    }

<<<<<<< HEAD
	return producto;		
=======
            producto.associate = function(models) {
                producto.belongsTo(models.lineas, {
                    // pueden haber varias relaciones seteadas
                    as: "linea",
                    foreignKey: "id_lineas",
                    });   
            }
           /* producto.associate = function(models) {
                producto.hasMany(models.carrito, {
                    // pueden haber varias relaciones seteadas
                    as: "carritos",
                    foreignKey: "id_carrito",
                    });    
            }*/
>>>>>>> 3a1c5a999db27526892f2b2117ea9492537cc166

}
