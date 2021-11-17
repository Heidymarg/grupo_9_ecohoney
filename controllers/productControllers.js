const path = require('path');
const fs = require('fs');

//**const productsFilepath = path.join(__dirname, '../data/productoVela.json')**//
const productsFilepath = path.join(__dirname, '../data/listadoProductosLineaHogar.json')
const products = JSON.parse(fs.readFileSync(productsFilepath, 'utf-8'));


const listaProductosCuidadoPersonal = [
    { id: "1", desc: "Vaso ecologico termico y Plegable", precio: "$1.800", bonif: "20%", foto: "/images/crema-nutritiva.PNG" },
    { id: "1", desc: "Envoltorio ecologico", precio: "$150", bonif: "30%", foto: "/images/honey-essence.jpg" },
    { id: "1", desc: "Pabilo", precio: "200", bonif: "15%", foto: "/images/honey-products-.jpg" },
    { id: "1", desc: "Vaso eco infantil", precio: "$1.200", bonif: "35%", foto: "/images/envoltorios-de-cera-de-abeja.jpg" }
]
const listaDeProductosAbejas = [
    { id: 1, desc: "Honey Essence", precio: 2800, bonif: "10%", foto: "/images/honey-essence.jpg" },
    { id: 2, desc: "Miel Organica", precio: 550, bonif: "20%", foto: "/images/miel-organica.PNG"},
    { id: 3, desc: "Envoltorio cera de abeja", precio: 400, bonif: "15%", foto: "/images/envoltorios-de-cera-de-abeja.jpg"},
    { id: 4, desc: "Crema nutritiva", precio: 800, bonif: "45%", foto: "/images/crema-nutritiva.PNG"}
]
const listaDeProductosHogar = [
    { id: 1, desc: "Botella Bambu", precio: 4000, bonif: "10%", foto: "/images/botella-bambu.jpg" },
    { id: 2, desc: "Rollo de Cocina", precio: 200, bonif: "20%", foto: "/images/rollo-cocina-eco.jpg"},
    { id: 3, desc: "Bolas de lana", precio: 300, bonif: "15%", foto: "/images/bolas-lana.jpg"},
    { id: 4, desc: "Estropajo natural", precio: 250, bonif: "45%", foto: "/images/estropajo-natural.jpg"}
]

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
        let id= req.params.id;
        let product = products.find(product=> product.id == id)
        res.render('productoDetallado', {product})
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