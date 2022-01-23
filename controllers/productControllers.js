const path = require('path');
const fs = require('fs');

const db = require('../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;


var listaDeProductosAbejas = db.productos.findAll();

const {validationResult} = require('express-validator');

var idLineaParaEliminar = null;
var idLineaParaModificar = null;

var prodParaModif = null;

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

		db.productos.findAll()
        .then( (resultado) => {
            res.render( 'listadoDeProducto', { 'productosEncontrados': resultado }) 
        
        })            
	},

	detalle:(req,res) => {	 
        let id = req.params.id;

		     db.productos.findByPk(id)
			 .then(product => {
				res.render('productoDetallado', { 'product': product})
			 })
			
	},	 
	/* *************************** Cargar Producto ****************************** */
    productoMostrarFormCarga: (req,res) => { 
        
		db.lineas.findAll()
		.then(resultado => { res.render('formularioCargaProducto', {'lineas': resultado}) }); 
    },
	grabar: (req, res) => {
        //Acá validaciones con Middleware
        const  { validationResult } = require('express-validator');
        let errores = validationResult(req);

        if( errores.isEmpty() ) {
            
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
		
		let	prodAModificar = { "idPrd": null, "nombre": null, "codigo" :"", "descripcion":"", "linea": "", "precio": "", "bonif": "", "foto": "", "quantity":"" }; // está forzado porque no retorna nada 	prod.idPrd = req.body.id y da undefined
		res.render('formularioModificarProducto',{'prodAModificar':prodAModificar}); 	     

    },
	traerParaModificar: ( req,res ) => {

		//req.query.idPrd; // funciona con GET 
		req.body.idPrd; // funciona con POST
        // reemplazar por datos de DB.let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == productId });
		db.productos.findByPk( req.body.idPrd )
		.then( resultado => {
			if ( resultado != undefined ) {
				prodParaModif = req.body.idPrd;
				res.render('formularioModificarProducto', {'prodAModificar': resultado });
			} else {
				res.redirect('formularioModificarProducto');
			}
		} )
		return prodParaModif;
	},
	modificar: (req, res) => {

		db.productos.findByPk( prodParaModif )
		.then( resultado => {
			if ( resultado != undefined ) {
				db.productos.update( {
					nombre: req.body.nombre,
					codigo: req.body.codigo,
					descripcion : req.body.descripcion,
					id_lineas : req.body.linea,
					precio : req.body.precio,
					bonif: req.body.bonif,
					foto:  "/images/"  + req.file.filename,
					cantidad: req.body.cantidad,    
				})
				.then( () => {
					let	prodAModificar = { "idPrd": null, "nombre": null, "codigo" :"", "descripcion":"", "linea": "", "precio": "", "bonif": "", "foto": "", "quantity":"" }; // está forzado porque no retorna nada 	prod.idPrd = req.body.id y da undefined
					res.render('formularioModificarProducto',{'prodAModificar':prodAModificar}); 	 
				})
			}
		})
	},
	/* *************************** Eliminar Producto ****************************** */
	productoMostrarFormEliminar: (req,res) => { 
		
		let	prodAEliminar = { "idPrd": null, "nombre": null, "codigo" :"", "descripcion":"", "linea": "", "precio": "", "bonif": "", "foto": "", "quantity":"" }; // está forzado porque no retorna nada 	prod.idPrd = req.body.id y da undefined
        
		res.render('formularioEliminarProducto', {'prodAEliminar':prodAEliminar}); 
		
    },
	traerParaConfirmar: ( req,res ) => {

		//productId = req.query.idPrd; // funciona con GET - variable global para compartir con eliminar
		let productId = req.body.idPrd; // funciona con POST - variable local para compartir con eliminar.
        let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == productId });
		
		if ( prodSeleccionado != undefined ) {
			res.render('formularioEliminarProducto', {'prodAEliminar': prodSeleccionado, mensaje: 'Hola' });
		} else {
			res.send( 'No existe producto con id: ' + productId );
			res.redirect('formularioEliminarProducto');
		}
	},
	eliminar : (req, res) => {

		//productId = req.query.idPrd; // funciona con GET - variable global para compartir con eliminar:
		//let productId = req.body.idPrd; // no funciona con POST - variable local para compartir con eliminar.
		let productId = req.params.idPrd; // funciona con POST - variable local para compartir con eliminar.

		// 1- Filtro los productos no seleccionados para armar el nuevo array.
		//let prodsEnOferta = listaProductosCuidadoPersonal.filter((product) => { return product.idPrd != productId });
		let prodsDeAbejas = listaDeProductosAbejas.filter((product) => { return product.idPrd != productId });
		
		// 2- Pasar a objeto literal el array y grabar a archivo
		if ( prodsDeAbejas != undefined ) { // si el producto existe en archivo
			fs.writeFileSync(path.join(__dirname, '../data/listadoProductosAbejas.json'), JSON.stringify(prodsDeAbejas), 'utf8');	
			res.render('formularioEliminarProducto', {'prodAEliminar':listaDeProductosAbejas.find( (product) => {return product.idPrd == productId } )});
			
		} else {
			
			res.send( 'Seleccionado: ' +  ' ' + productId + ' ' + 'no existe. ');	
		}
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