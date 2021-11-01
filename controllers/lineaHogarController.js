const path = require( 'path');
/*
const cuidadoPersonalController = {
    inicio: (req,res) => { res.sendFile( path.join( __dirname, "../views/lineaHogar.html" ) ) },
};*/

/* Implementacion MVC 
const listaDeProductosAbejas = [
    { id: 1, desc: "Honey Essence", precio: 2800, bonif: "10%", foto: "/images/honey-essence.jpg" },
    { id: 2, desc: "Miel Organica", precio: 550, bonif: "20%", foto: "/images/miel-organica.PNG"},
    { id: 3, desc: "Envoltorio cera de abeja", precio: 400, bonif: "15%", foto: "/images/envoltorios-de-cera-de-abeja.jpg"},
    { id: 4, desc: "Crema nutritiva", precio: 800, bonif: "45%", foto: "/images/crema-nutritiva.PNG"}
];   */

const listaDeProductosAbejas = [
    { id: 1, desc: "Botella Bambu", precio: 4000, bonif: "10%", foto: "/images/botella-bambu.jpg" },
    { id: 2, desc: "Rollo de Cocina", precio: 200, bonif: "20%", foto: "/images/rollo-cocina-eco.jpg"},
    { id: 3, desc: "Bolas de lana", precio: 300, bonif: "15%", foto: "/images/bolas-lana.jpg"},
    { id: 4, desc: "Estropajo natural", precio: 250, bonif: "45%", foto: "/images/estropajo-natural.jpg"}
];


/*
const listaOfertas = [
    { id: "1", desc: "Vaso ecologico termico y Plegable", precio: "$1.800", bonif: "20%", foto: "/images/vaso-plegable.jpg" },
    { id: "1", desc: "Envoltorio ecologico", precio: "$150", bonif: "30%", foto: "/images/envoltorio-ecologico-colmena.jpg" },
    { id: "1", desc: "Pabilo", precio: "200", bonif: "15%", foto: "/images/pabilo-organico.jpg" },
    { id: "1", desc: "Vaso eco infantil", precio: "$1.200", bonif: "35%", foto: "/images/vaso-ecologico-infantil.jpg" }
]
*/
const cuidadoPersonalController = {
    inicio: (req,res) => { res.render( 'lineaHogar', { usr: 'Oscar', listado: listaDeProductosAbejas } ) },

};

module.exports = cuidadoPersonalController;
