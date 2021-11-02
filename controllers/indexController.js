const path = require( 'path');
/* con MVC
const indexController = {
index: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/index.html" ) ) },
};
*/

const listaDeProductosAbejas = [
    { id: 1, desc: "Botella Bambu", precio: 4000, bonif: "10%", foto: "/images/botella-bambu.jpg" },
    { id: 2, desc: "Rollo de Cocina", precio: 200, bonif: "20%", foto: "/images/rollo-cocina-eco.jpg"},
    { id: 3, desc: "Bolas de lana", precio: 300, bonif: "15%", foto: "/images/bolas-lana.jpg"},
    { id: 4, desc: "Estropajo natural", precio: 250, bonif: "45%", foto: "/images/estropajo-natural.jpg"}
];

const listaOfertas = [
    { id: "1", desc: "Vaso ecologico termico y Plegable", precio: "$1.800", bonif: "20%", foto: "/images/vaso-plegable.jpg" },
    { id: "1", desc: "Envoltorio ecologico", precio: "$150", bonif: "30%", foto: "/images/envoltorio-ecologico-colmena.jpg" },
    { id: "1", desc: "Pabilo", precio: "200", bonif: "15%", foto: "/images/pabilo-organico.jpg" },
    { id: "1", desc: "Vaso eco infantil", precio: "$1.200", bonif: "35%", foto: "/images/vaso-ecologico-infantil.jpg" }
]

const indexController = {
    /* Con MVC + EJS */
    index: (req,res) => { res.render( 'index', { user: 'Oscar', listadoOfertas: listaOfertas, listadoAbejas: listaDeProductosAbejas} ) }

    };
module.exports = indexController;