const path = require( 'path');
/*
const cuidadoPersonalController = {
    inicio: (req,res) => { res.sendFile( path.join( __dirname, "../views/lineaHogar.html" ) ) },
};*/

/* Implementacion MVC */
const cuidadoPersonalController = {
    inicio: (req,res) => { res.render( path.resolve( 'views', 'lineaHogar' ) ) },
};

module.exports = cuidadoPersonalController;
