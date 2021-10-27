const path = require( 'path');

const cuidadoPersonalController = {
    inicio: (req,res) => { res.sendFile( path.join( __dirname, "../views/lineaHogar.html" ) ) },
};

module.exports = cuidadoPersonalController;
