const path = require('path');
const fs = require('fs');

const productsFilepath = path.join(__dirname, '../data/productoVela.json')
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
    detail:(req,res) => { 
        let id= req.params.id;
        let product = products.find(product=> product.id == id)
        res.render('productoDetallado', {product})
    },
    productAdd: (req,res) => { 
        res.render('formularioCargaProducto') 
    },
    carrito:(req,res) => { 
        res.render('carrito') 
    },
};


module.exports = productController;