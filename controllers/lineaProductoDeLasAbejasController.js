
/*const { appendFileSync } = require('fs');*/
const path = require( 'path');
/*
const lineaProductoDeLasAbejasController = {
    inicio: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/lineaProductoDeLasAbejas.html" ) ) },
};*/

/* Implementación de MVC */

const listaDeProductosAbejas = [
    { id: 1, desc: "Honey Essence", precio: 2800, bonif: "10%", foto: "/images/honey-essence.jpg" },
    { id: 2, desc: "Miel Organica", precio: 550, bonif: "20%", foto: "/images/miel-organica.PNG"},
    { id: 3, desc: "Envoltorio cera de abeja", precio: 400, bonif: "15%", foto: "/images/envoltorios-de-cera-de-abeja.jpg"},
    { id: 4, desc: "Crema nutritiva", precio: 800, bonif: "45%", foto: "/images/crema-nutritiva.PNG"}


]

const cuidadoPersonalController = {
        inicio: (req,res) => { res.render( 'lineaProductoDeLasAbejas', { usr: 'Yariela', listado: listaDeProductosAbejas } ) },
    
    };
    
module.exports = cuidadoPersonalController;


