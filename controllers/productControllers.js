const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;


var listaDeProductosAbejas = db.productos.findAll();

const {validationResult, body} = require('express-validator');

var idLineaParaEliminar = null;
var idLineaParaModificar = null;

var productoSeleccionado = null;

var lineas = db.lineas.findAll();

const productController = {

	/* ******************************************************************************** */
	/* ************** Métodos para direccionar a Líneas de Productos ****************** */
	/* ******************************************************************************** */	
    inicioHogar: (req,res) => { 
		
		db.productos.findAll( { where: {id_lineas:1} } )
		.then( listado => { 
			res.render( 'lineaHogar', { usr: 'Oscar', 'listado': listado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil }) 
		} ).catch( error => console.log(error))
    },
	inicioCuidadoPersonal: (req,res) => { 
		db.productos.findAll({where:{id_lineas:2}})
		.then( listado => {res.render( 'lineaCuidadoPersonal', {usr: 'NoheliaK', 'listado': listado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil }) } )
    },
    inicioAbejas: (req,res) => { 
		db.productos.findAll({where:{id_lineas:3}})
		.then( listado => res.render( 'lineaProductoDeLasAbejas', { usr: 'Heidy', 'listado': listado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil }) )
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
		.then( resultado => { res.render( 'resultadoBuscarProducto', {'productosEncontrados': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil} )});
	},
	
	listar: (req, res) => {
		// ok no tocar
		db.productos.findAll()
        .then( (resultado) => {
            res.render( 'listadoDeProducto', { 'productosEncontrados': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil}) 
        
        })            
	},

	detalle:(req,res) => {
		// ok no tocar	 
        let id = req.params.id;

		     db.productos.findByPk(id)
			 .then(product => {
				//res.render('productoDetallado', { 'product': product, 'usuarioAceptado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil})
				res.render('productoDetallado', { 'product': product, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil })
			 })
			
	},	 
	/* *************************** Cargar Producto ****************************** */
    productoMostrarFormCarga: (req,res) => { 
		// ok - falta validaciones back end
        db.lineas.findAll()
		.then(resultado => { res.render('formularioCargaProducto', {'lineas': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil}) }); 
    },
	grabar: (req, res) => {
        // ok - falta validaciones back end
     
        let errores = validationResult(req);
        if(errores.isEmpty()){

			if ( req.file.filename != undefined ) {
				
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
					console.log(errores),
				Promise.all([lineas])
				.then( ([lineas]) => {
					res.render('formularioCargaProducto', { 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'lineas': lineas, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
				}))
			} else { // falta cargar la foto
				Promise.all([lineas])
				.then( ([lineas]) => {
					errores.push( {
                        value: undefined,
                        msg: 'Falta Cargar la Foto ',
                        param: 'foto',
                        location: 'file'
                      })
					res.render('formularioCargaProducto', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'lineas': lineas, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
				} )
			}          

        } else {
            Promise.all([lineas])
            .then( ([lineas]) => {
                res.render('formularioCargaProducto', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'lineas': lineas, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
            } )
        }
        
    },
	/* *************************** Modificar Producto ****************************** */
	productoMostrarFormModificar: (req,res) => { 	
		
		prodAModificar = db.productos.findByPk( req.params.id );
		Promise.all((promesas = [lineas, prodAModificar]))
		.then( promesas => {
			res.render('formularioModificarProducto',{'prodAModificar':promesas[1], 'lineas': promesas[0], 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil}); 	     
			return prodAModificar = promesas[1];
		})
		

    },
	modificar: (req, res) => {
		
	 let errores = validationResult(req);
	 if(errores.isEmpty()){
	 db.productos.findByPk( prodAModificar.idPrd )
	 .then( resultado => {
		 if ( resultado != undefined ) {
		 
			 console.log(prodAModificar + '!!!'  + req.file.filename)

			 db.productos.update( {
				 nombre: req.body.nombre,
				 codigo: req.body.codigo,
				 descripcion : req.body.descripcion,
				 id_lineas : req.body.linea,
				 precio : req.body.precio,
				 bonif: req.body.bonif,
				 foto:  '/images'  +  req.file.filename,
				 cantidad: req.body.cantidad,    
			 },{
				 where : { idPrd : resultado.idPrd }
			 })
			 
		 }
	 })
	 .then(
		 db.productos.findAll()
				  .then( (resultado) => {
			 res.render( 'listadoDeProducto', { 'resultadoValidaciones': errores.mapped(), 'productosEncontrados': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil }) 
		 }))
	 } else {
		 Promise.all([lineas])
		 .then( ([lineas]) => {
			 res.render('formularioModificarProducto', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body,'lineas': lineas, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil });
		 } )
	 }
	 
	 
 },

 /* *************************** Eliminar Producto ****************************** */
 productoMostrarFormEliminar: (req,res) => { 
	// ok no tocar
	db.productos.findByPk( req.params.id )
	.then( resultado => {
		res.render('formularioEliminarProducto', {'prodAEliminar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil });
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
			res.render( 'listadoDeProducto', { 'productosEncontrados': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil }) 
		})
	)
},



		
	/* ******************************************************************************** */
	/* ********** Métodos para atender la gestión de Líneas de productos ************** */
	/* ******************************************************************************** */
	listarLinea: function(req,res) {
		db.lineas.findAll()
		.then( resultado => {
			res.render('listadoLineas', {'lineas': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil})
		})
	},
	
	/* ******************************************************************************** */
	agregarLinea: function(req,res) {
			res.render("lineasAgregar", {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
	},
	agregarGrabarLinea: function(req,res) {
	
		let errores = validationResult(req);
		if(errores.isEmpty()){
			db.lineas.create( { nombre: req.body.linea } );	
			res.render('lineasAgregar', {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
		} else {
			res.render('lineasAgregar', {'resultadoValidaciones': errores.mapped(), 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
		}
	},
	
	/* ******************************************************************************** */
	modificarLinea: function(req,res) {
		let	lineaAModificar = { "id_lineas": null, "nombre": null };
		res.render( "lineasModificar", {'lineaAModificar':lineaAModificar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
	},
	confirmarModificarLinea: function(req,res) {
		let	lineaAModificar = { "id_linea": null, "nombre": null }; 
		db.lineas.findByPk( req.body.linea )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("lineasModificar", {'lineaAModificar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil} ) 	
			} else {
			}
		} );
		
		return idLineaParaModificar = req.body.linea;
	},
	modificarGrabarLinea: function(req,res) {
		
		//res.send("dato a Modificar Grabar" + idLineaParaModificar);
		
	
		let errores = validationResult(req);
		//// viaja ok .then( resultado => {res.send('Linea a modificar' + resultado.id_lineas + '  ' + resultado.nombre + 'Nuevo Nombre: ' + req.body.nombre);} )
		db.lineas.findByPk( idLineaParaModificar )
		.then( resultado => {
			db.lineas.update( {nombre: req.body.nombre}, {where: {id_lineas : resultado.id_lineas}} ); 
			let	lineaAModificar = { "id_linea": null, "nombre": null }; 
			res.render('lineasModificar', {'lineaAModificar':lineaAModificar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil}) } )	
	},

	/* ******************************************************************************** */
	mostrarEliminarLinea: function(req,res) {
		let	lineaAEliminar = { "id_linea": null, "nombre": null }; 
		res.render("lineasEliminar", {'lineaAEliminar': lineaAEliminar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
	},
	confirmarEliminarLinea: function(req,res) {
		let	lineaAEliminar = { "id_linea": null, "nombre": null }; 
		db.lineas.findByPk( req.body.linea )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("lineasEliminar", {'lineaAEliminar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil} ) 	
			} else {
				res.render("lineasEliminar", {'lineaAEliminar': { id_linea: "-1", nombre: " no existe!!! " }, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil} ) 
			}
		} );
		return idLineaParaEliminar = req.body.linea;
	},
	eliminarGrabarLinea: function(req,res) {
		db.lineas.findByPk( idLineaParaEliminar )
		.then( resultado => { db.lineas.destroy( {where: { id_lineas : resultado.id_lineas}} );
		let	lineaAEliminar = { "id_linea": null, "nombre": null }; 
		res.render('lineasEliminar', {'lineaAEliminar': lineaAEliminar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil': req.session.suPerfil});
		} );
	},

};
module.exports = productController;