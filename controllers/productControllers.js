const path = require('path');
const fs = require('fs');

const productsAbejasFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
var listaDeProductosAbejas = JSON.parse(fs.readFileSync(productsAbejasFilepath, 'utf8'));

const db = require('../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;

const {validationResult} = require('express-validator');

var idLineaParaEliminar = null;

const productController = {
    inicioCuidadoPersonal: (req,res) => { 
        res.render( 'lineaCuidadoPersonal', {usr: 'NoheliaK', listado:listaDeProductosAbejas}) 
    },
    inicioAbejas: (req,res) => { 
        res.render( 'lineaProductoDeLasAbejas', { usr: 'Yariela', listado: listaDeProductosAbejas }) 
    },
    inicioHogar: (req,res) => { 
        res.render( 'lineaHogar', { usr: 'Oscar', listado: listaDeProductosAbejas }) 
    },

	listar: (req, res) => {
		res.send("Listar todos los productos - Página en construcción!!!");
	},

    detalle:(req,res) => { 
        let id = req.params.id;

		// a resolver con Base de Datos... if viende de Especial Abejas o de Ofertas
        let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == id });
		     res.render('productoDetallado', { product: prodSeleccionado })
			
		 
    },

	
    carrito:(req,res) => { 
        res.render('carrito') 
    },


    productoMostrarFormCarga: (req,res) => { 
        res.render('formularioCargaProducto'); 
    },

	productoMostrarFormModificar: (req,res) => { 	
		
		let	prodAModificar = { "idPrd": null, "nombre": null, "codigo" :"", "descripcion":"", "linea": "", "precio": "", "bonif": "", "foto": "", "quantity":"" }; // está forzado porque no retorna nada 	prod.idPrd = req.body.id y da undefined
		res.render('formularioModificarProducto',{'prodAModificar':prodAModificar}); 	     

    },
	traerParaModificar: ( req,res ) => {

		//productId = req.query.idPrd; // funciona con GET 
		let productId = req.body.idPrd; // funciona con POST
        let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == productId });
		
		if ( prodSeleccionado != undefined ) {
			res.render('formularioModificarProducto', {'prodAModificar': prodSeleccionado, mensaje: 'Hola' });
		} else {
			res.send( 'No existe producto con id: ' + productId );
			res.redirect('formularioModificarProducto');
		}
	},
	modificar: (req, res) => {

		let productToEdit = listaDeProductosAbejas.find((product) => { return product.idPrd == req.params.id });
		res.send('Producto a Modificar ' + productToEdit.idPrd + ' ' + productToEdit.nombre );
		/*
		22/12/2021 el form trae el producto a modificar.
		Falta la lógica para modificar en base de datos
		de sprint 6.
		*/
	},

	// Delete
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

		
		// 3- Volver al form con mensaje de confirmación de la operación efectuada
		//res.redirect('formularioEliminarProducto');
	},

    // Create -  Method to store
	grabar: (req, res) => {
		/* 22/12/2021
		anda el form de carga. Falta, validación, multer y la lógica para grabar a base de datos.
		*/
		if ( req.body ) {
			res.send("Hay Foto " + req.body.foto)
			
		} else {
			res.send("No hay Foto " + req.body.foto)
		}
		/*
		res.send( "El form de carga trae: " + req.body.codigo + ' ' + req.body.nombre + ' ' + req.body.Descripcion 
		+ ' ' + req.body.linea + ' ' + req.body.precio + ' ' + req.body.bonif + ' ' + req.file );
		*/
	},
		

	/* * Métodos para atender la gestión de Líneas de productos * */
	listarLinea: function(req,res) {
		db.lineas.findAll()
		.then( resultado => {
			res.render('listadoLineas', {'lineas': resultado})
		})
	},	

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
	
	modificarLinea: function(req,res) {
		res.render( "lineasModificar");
	},
	modificarGrabarLinea: function(req,res) {
		//res.render("lineasModificar");*//
		res.send("dato a grabar " + req.body.linea)
		
	},

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
	}

};



module.exports = productController;