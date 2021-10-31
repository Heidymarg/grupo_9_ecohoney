const path = require( 'path');

const cuidadoPersonalController = {
    inicio: (req,res) => { res.render( path.resolve( 'views', 'lineaCuidadoPersonal' ) ) } 
};

module.exports = cuidadoPersonalController;
