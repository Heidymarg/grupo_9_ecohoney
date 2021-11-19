const path = require('path');
const fs = require('fs');

const productsPersonalFilepath = path.join(__dirname, '../data/listadoProductosCuidadoPersonal.json')
var listaProductosCuidadoPersonal = JSON.parse(fs.readFileSync(productsPersonalFilepath, 'utf8'));

const productsAbejasFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
var listaDeProductosAbejas = JSON.parse(fs.readFileSync(productsAbejasFilepath, 'utf8'));

const productsHogarFilepath = path.join(__dirname, '../data/listadoProductosLineaHogar.json')
var listaDeProductosHogar = JSON.parse(fs.readFileSync(productsHogarFilepath, 'utf8'));

const productController = {
    inicioCuidadoPersonal: (req,res) => { 
        res.render( 'lineaCuidadoPersonal', {usr: 'NoheliaK', listado:listaProductosCuidadoPersonal}) 
    },
    inicioAbejas: (req,res) => { 
        res.render( 'lineaProductoDeLasAbejas', { usr: 'Yariela', listado: listaDeProductosAbejas }) 
    },
    inicioHogar: (req,res) => { 
        res.render( 'lineaHogar', { usr: 'Oscar', listado: listaDeProductosHogar }) 
    },
    detalle:(req,res) => { 
        let id = req.params.id;

		// a resolver más eficiente... if viende de Especial Abejas o de Ofertas
		let prodOferta = listaProductosCuidadoPersonal.find( (product) => {return product.idPrd == req.params.id } );
        let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == id });
		if ( prodOferta != undefined ) {
			res.render('productoDetallado', { product: prodOferta })
		} else {
			if ( prodSeleccionado != undefined ) {
				res.render('productoDetallado', { product: prodSeleccionado })
			}	
		} 
    },

    productoMostrarFormCarga: (req,res) => { 
        res.render('formularioCargaProducto'); 
    },

	productoMostrarFormModificar: (req,res) => { 
        res.render('formularioModificarProducto '); 
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
		let productToEdit = products.find(product => product.idPrd == id)
		let image

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
		res.redirect('/');
	},

	// Delete
	productoMostrarFormEliminar: (req,res) => { 
		
		let	prodAEliminar = { "idPrd": null, "nombre": null, "codigo" :"", "descripcion":"", "linea": "", "precio": "", "bonif": "", "foto": "", "quantity":"" }; // está forzado porque no retorna nada 	prod.idPrd = req.body.id y da undefined
        
		res.render('formularioEliminarProducto', {'prodAEliminar':prodAEliminar}); 
		
    },

	traerParaConfirmar: ( req,res ) => {

		//productId = req.query.idPrd; // funciona con GET - variable global para compartir con eliminar
		let productId = req.body.idPrd; // funciona con POST - variable local para compartir con eliminar.
		
		let prodOferta = listaProductosCuidadoPersonal.find( (product) => {return product.idPrd == productId } );
        let prodSeleccionado = listaDeProductosAbejas.find((product) => { return product.idPrd == productId });

		
		if ( prodOferta != undefined ) {
			res.render('formularioEliminarProducto', {'prodAEliminar': prodOferta, mensaje: 'Hola' });
		} else if ( prodSeleccionado != undefined ) {
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
		let prodsEnOferta = listaProductosCuidadoPersonal.filter((product) => { return product.idPrd != productId });
		let prodsDeAbejas = listaDeProductosAbejas.filter((product) => { return product.idPrd != productId });
		
		// 2- Pasar a objeto literal el array y grabar a archivo
		if ( prodsEnOferta != undefined ) { // si el producto existe en archivo
			fs.writeFileSync(path.join(__dirname, '../data/listadoProductosCuidadoPersonal.json'), JSON.stringify(prodsEnOferta), 'utf8');
			//fs.writeFileSync('listadoProductosCuidadoPersonal.json', JSON.stringify(prodsEnOferta), 'utf8');
			res.render('formularioEliminarProducto', {'prodAEliminar':listaProductosCuidadoPersonal.find( (product) => {return product.idPrd == productId } )});
			//res.send( 'Seleccionado: ' + ' ' + productId + ' ' + prodsEnOferta);
		} else {
			/*
			if ( prodsDeAbejas != undefined ) { // si el producto existe en archivo
				// fs.writeFileSync(path.join(__dirname, '../data/listadoProductosAbejas.json'), JSON.stringify(prodsDeAbejas), 'utf8');
				fs.writeFileSync('listadoProductosAbejas.json', JSON.stringify(prodsDeAbejas), 'utf8');
				res.render('formularioEliminarProducto', {'prodAEliminar':listaDeProductosAbejas.find((product) => { return product.idPrd == productId } )});
				//res.send( 'Seleccionado: ' +  ' ' + productId + ' ' + prodsDeAbejas);	
			} */
			res.send( 'Seleccionado: ' +  ' ' + productId + ' ' + 'no existe. ');	
		}
		//res.send( 'Seleccionado: ' + productId);
		// 3- Volver al form con mensaje de confirmación de la operación efectuada
		//res.redirect('formularioEliminarProducto');
	},

    // Create -  Method to store
	grabar: (req, res) => {
		let image
		console.log(req.files);
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		}

    }   
};




module.exports = productController;