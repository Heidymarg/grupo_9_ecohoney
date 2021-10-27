const path = require( 'path');

const cuidadoPersonalController = {
    inicio: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/lineaCuidadoPersonal.html" ) ) },
};

module.exports = cuidadoPersonalController;
