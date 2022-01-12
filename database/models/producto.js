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

	return producto;		

}
