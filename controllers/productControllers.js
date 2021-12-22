const path = require('path');
const fs = require('fs');

const productsAbejasFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
var listaDeProductosAbejas = JSON.parse(fs.readFileSync(productsAbejasFilepath, 'utf8'));

const {validationResult} = require('express-validator');

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

		// a resolver más eficiente... if viende de Especial Abejas o de Ofertas
        let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == id });
		     res.render('productoDetallado', { product: prodSeleccionado })
			
		 
    },

    productoMostrarFormCarga: (req,res) => { 
        res.render('formularioCargaProducto'); 
    },

	productoMostrarFormModificar: (req,res) => { 	
		let	prodAModificar = { "idPrd": null, "nombre": null, "codigo" :"", "descripcion":"", "linea": "", "precio": "", "bonif": "", "foto": "", "quantity":"" }; // está forzado porque no retorna nada 	prod.idPrd = req.body.id y da undefined
        
	res.render('formularioModificarProducto',{'prodAModificar':prodAModificar}); 
	//res.send("Funciona" + req.body.idPrd);
	     
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

    carrito:(req,res) => { 
        res.render('carrito') 
    },

    // Update - Form to edit
	editar: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.idPrd == id)
		res.render('product-edit-form', {productToEdit})
	},

    // Update - Method to update
	modificar: (req, res) => {
		let id = req.params.id;
		let productToEdit = listaDeProductosAbejas.find((product) => { return product.idPrd == id });
		res.send('Producto a Modificar' + productToEdit)
		
		//let productToEdit = products.find(product => product.idPrd == id)
		/*let image

		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = productToEdit.image
		}

		productToEdit = {
			idPrd: productToEdit.idPrd,
			...req.body,
			image: image,
		};
		
		let newProducts = products.map(product => {
			if (product.idPrd == productToEdit.idPrd) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');*/
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
		let productCarga={
		idPrd: (parseInt(listaDeProductosAbejas[listaDeProductosAbejas.length-1].idPrd) +1).toString(),

		 ...req.body,
		  foto:'/images/' + req.file.filename}
		 
		listaDeProductosAbejas.push(productCarga)
		fs.writeFileSync(productsAbejasFilepath, JSON.stringify(listaDeProductosAbejas, null,' '))
		res.redirect('/productos/lineaProductoDeLasAbejas')
		},

	/* *** Métodos para atender la gestión de Líneas de productos *** */
	listarLinea: function(req,res) {
		res.send("Líneas de Productos Listar - Página en construcción!!!");
	},	
	agregarLinea: function(req,res) {

		let errores = validationResult(req);
		if(!errores.isEmpty()){
			res.render("lineasAgregar", {'resultadoValidaciones': errores.mapped()})
		} /*else {
			res.redirect('lineasAgregar')
		}*/
		
	},
	agregarGrabarLinea: function(req,res) {
		let errores = validationResult(req);
		if(errores.isEmpty()){
		/*res.send( req.body.linea + ' ' + errores)
		acá va la lógica para agregar la base de datos*/
		/*res.render('lineasAgregar', )*/
		res.send(req.body.linea)
		} 
	},
	
	modificarLinea: function(req,res) {
		res.send("Modificar Línea de Productos - Página en construcción!!!");
	},
	modificarGrabarLinea: function(req,res) {
		res.send("Modificar GRabar Línea de Productos - Página en construcción!!!");
	},

	eliminarLinea: function(req,res) {
		res.send("Eliminar Línea de Productos - Página en construcción!!!");
	},
	eliminarGrabarLinea: function(req,res) {
		res.send("Eliminar Grabar Línea de Productos - Página en construcción!!!");
	}

};



module.exports = productController;