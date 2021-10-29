
const path = require( 'path');

const lineaProductoDeLasAbejasController = {
    inicio: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/lineaProductoDeLasAbejas.html" ) ) },
};

module.exports = lineaProductoDeLasAbejasController;


