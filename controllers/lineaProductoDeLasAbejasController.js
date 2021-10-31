
const path = require( 'path');
/*
const lineaProductoDeLasAbejasController = {
    inicio: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/lineaProductoDeLasAbejas.html" ) ) },
};*/

/* Implementación de MVC */
const lineaProductoDeLasAbejasController = {
    inicio: (req,res) => { res.render( path.resolve( "views", "lineaProductoDeLasAbejas" ) ) },
};

module.exports = lineaProductoDeLasAbejasController;


