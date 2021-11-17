const path = require('path');
const fs = require('fs');

const productsPersonalFilepath = path.join(__dirname, '../data/listadoProductosCuidadoPersonal.json')
const listaProductosCuidadoPersonal = JSON.parse(fs.readFileSync(productsPersonalFilepath, 'utf-8'));

const productsAbejasFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
const listaDeProductosAbejas = JSON.parse(fs.readFileSync(productsAbejasFilepath, 'utf-8'));

const productsHogarFilepath = path.join(__dirname, '../data/listadoProductosLineaHogar.json')
const listaDeProductosHogar = JSON.parse(fs.readFileSync(productsHogarFilepath, 'utf-8'));

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
		} else if ( prodSeleccionado != undefined ) {
			res.render('productoDetallado', { product: prodSeleccionado })
		}

    },
    productoAgregar: (req,res) => { 
        res.render('formularioCargaProducto') 
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

	// Delete - Delete one product from DB
	eliminar : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.idPrd != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
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