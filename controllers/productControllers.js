const path = require('path');
const fs = require('fs');

const db = require('../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;


var listaDeProductosAbejas = db.productos.findAll();

const {validationResult} = require('express-validator');

var idLineaParaEliminar = null;
var idLineaParaModificar = null;

var productoSeleccionado = null;

var lineas = db.lineas.findAll();

const productController = {

	/* ******************************************************************************** */
	/* ************** Métodos para direccionar a Líneas de Productos ****************** */
	/* ******************************************************************************** */	
    inicioCuidadoPersonal: (req,res) => { 
		db.productos.findAll()
		.then( listado => {res.render( 'lineaCuidadoPersonal', {usr: 'NoheliaK', 'listado': listado}) } )
    },
    inicioAbejas: (req,res) => { 
		db.productos.findAll()
		.then( listado => res.render( 'lineaProductoDeLasAbejas', { usr: 'Heidy', 'listado': listado }) )
    },
    inicioHogar: (req,res) => { 
		db.productos.findAll()
		.then( listado => res.render( 'lineaHogar', { usr: 'Oscar', 'listado': listado }) )
    },

	/* ******************************************************************************** */
	/* *************** Métodos para atender la gestión de Productos ******************* */
	/* ******************************************************************************** */
	
	buscar: ( req,res ) => {
		// ok no tocar
		db.productos.findAll( {
			where: {
						[op.or]: [
					  	{
							nombre: {
						  	[op.substring]: req.body.buscado
							}
					  	},
					  	{
							descripcion: {
						  	[op.substring]: req.body.buscado
							}
					  	}
						]
					}
		})
		.then( resultado => { res.render( 'resultadoBuscarProducto', {'productosEncontrados': resultado} )});
	},
	
	listar: (req, res) => {
		// ok no tocar
		db.productos.findAll()
        .then( (resultado) => {
            res.render( 'listadoDeProducto', { 'productosEncontrados': resultado }) 
        
        })            
	},

	detalle:(req,res) => {
		// ok no tocar	 
        let id = req.params.id;

		     db.productos.findByPk(id)
			 .then(product => {
				res.render('productoDetallado', { 'product': product})
			 })
			
	},	 
	/* *************************** Cargar Producto ****************************** */
    productoMostrarFormCarga: (req,res) => { 
		// ok - falta validaciones back end
        db.lineas.findAll()
		.then(resultado => { res.render('formularioCargaProducto', {'lineas': resultado}) }); 
    },
	grabar: (req, res) => {
        // ok - falta validaciones back end
        let {validationResult} = require('express-validator');
        let errores = validationResult(req);
        if(errores.isEmpty()){
            
            db.productos.create({ 
                nombre: req.body.nombre,
                codigo: req.body.codigo,
                descripcion : req.body.descripcion,
                id_lineas : req.body.linea,
                precio : req.body.precio,
                bonif: req.body.bonif,
				foto:  "/images/"  + req.file.filename,
                cantidad: req.body.cantidad,         
            })
			.then(
			Promise.all([lineas])
            .then( ([lineas]) => {
                res.render('formularioCargaProducto', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'lineas': lineas});
			}))

        } else {
            Promise.all([lineas])
            .then( ([lineas]) => {
                res.render('formularioCargaProducto', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'lineas': lineas});
            } )
        }
        
    },
	/* *************************** Modificar Producto ****************************** */
	productoMostrarFormModificar: (req,res) => { 	
		
		productoSeleccionado = db.productos.findByPk( req.params.id );
		Promise.all((promesas = [lineas, productoSeleccionado]))
		.then( promesas => {
			res.render('formularioModificarProducto',{'prodAModificar':promesas[1], 'lineas': promesas[0]}); 	     
			return productoSeleccionado = promesas[1];
		})
		

    },
	modificar: (req, res) => {
		
		
		db.productos.findByPk( productoSeleccionado.idPrd )
		.then( resultado => {
			if ( resultado != undefined ) {
			
				console.log(req.body.foto + '!!!'  + req.file.filename)

				db.productos.update( {
					nombre: req.body.nombre,
					codigo: req.body.codigo,
					descripcion : req.body.descripcion,
					id_lineas : req.body.linea,
					precio : req.body.precio,
					bonif: req.body.bonif,
					foto:  '/images/'  + req.file.filename,
					cantidad: req.body.cantidad,    
				},{
					where : { idPrd : resultado.idPrd }
				})
				
			}
		})
		.then(
			db.productos.findAll()
        	.then( (resultado) => {
            	res.render( 'listadoDeProducto', { 'productosEncontrados': resultado }) 
        	})
		)
		
	},

	/* *************************** Eliminar Producto ****************************** */
	productoMostrarFormEliminar: (req,res) => { 
		// ok no tocar
		db.productos.findByPk( req.params.id )
        .then( resultado => {
			res.render('formularioEliminarProducto', {'prodAEliminar': resultado });
                return productoSeleccionado = resultado;
        } );
		
    },
	eliminar : (req, res) => {

		//res.send( 'Producto a eliminar ' + req.params.id )
		db.productos.findByPk( req.params.id )
		.then( resultado => {
			db.productos.destroy( {where: {idPrd : req.params.id}} )
		})
		.then(
			db.productos.findAll()
        	.then( (resultado) => {
            	res.render( 'listadoDeProducto', { 'productosEncontrados': resultado }) 
        	})
		)
	},

		
	/* ******************************************************************************** */
	/* ********** Métodos para atender la gestión de Líneas de productos ************** */
	/* ******************************************************************************** */
	listarLinea: function(req,res) {
		db.lineas.findAll()
		.then( resultado => {
			res.render('listadoLineas', {'lineas': resultado})
		})
	},
	
	/* ******************************************************************************** */
	agregarLinea: function(req,res) {
			res.render("lineasAgregar");
	},
	agregarGrabarLinea: function(req,res) {
		let {validationResult} = require('express-validator');
		let errores = validationResult(req);
		if(errores.isEmpty()){
			db.lineas.create( { nombre: req.body.linea } );	
			res.render('lineasAgregar');
		} else {
			res.render('lineasAgregar', {'resultadoValidaciones': errores.mapped()});
		}
	},
	
	/* ******************************************************************************** */
	modificarLinea: function(req,res) {
		let	lineaAModificar = { "id_lineas": null, "nombre": null };
		res.render( "lineasModificar", {'lineaAModificar':lineaAModificar});
	},
	confirmarModificarLinea: function(req,res) {
		let	lineaAModificar = { "id_linea": null, "nombre": null }; 
		db.lineas.findByPk( req.body.linea )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("lineasModificar", {'lineaAModificar': resultado} ) 	
			} else {
				res.render("lineasModificar", {'lineaAModificar': { id_linea: "-1", nombre: " no existe!!! " }} ) 
			}
		} );
		
		return idLineaParaModificar = req.body.linea;
	},
	modificarGrabarLinea: function(req,res) {
		
		//res.send("dato a Modificar Grabar" + idLineaParaModificar);
		
		let {validationResult} = require('express-validator');
		let errores = validationResult(req);
		//// viaja ok .then( resultado => {res.send('Linea a modificar' + resultado.id_lineas + '  ' + resultado.nombre + 'Nuevo Nombre: ' + req.body.nombre);} )
		db.lineas.findByPk( idLineaParaModificar )
		.then( resultado => {
			db.lineas.update( {nombre: req.body.nombre}, {where: {id_lineas : resultado.id_lineas}} ); 
			let	lineaAModificar = { "id_linea": null, "nombre": null }; 
			res.render('lineasModificar', {'lineaAModificar':lineaAModificar}) } )	
	},

	/* ******************************************************************************** */
	mostrarEliminarLinea: function(req,res) {
		let	lineaAEliminar = { "id_linea": null, "nombre": null }; 
		res.render("lineasEliminar", {'lineaAEliminar': lineaAEliminar});
	},
	confirmarEliminarLinea: function(req,res) {
		let	lineaAEliminar = { "id_linea": null, "nombre": null }; 
		db.lineas.findByPk( req.body.linea )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("lineasEliminar", {'lineaAEliminar': resultado} ) 	
			} else {
				res.render("lineasEliminar", {'lineaAEliminar': { id_linea: "-1", nombre: " no existe!!! " }} ) 
			}
		} );
		return idLineaParaEliminar = req.body.linea;
	},
	eliminarGrabarLinea: function(req,res) {
		db.lineas.findByPk( idLineaParaEliminar )
		.then( resultado => { db.lineas.destroy( {where: { id_lineas : resultado.id_lineas}} );
		let	lineaAEliminar = { "id_linea": null, "nombre": null }; 
		res.render('lineasEliminar', {'lineaAEliminar': lineaAEliminar});
		} );
	},

};
module.exports = productController;