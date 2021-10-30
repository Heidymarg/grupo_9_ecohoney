const path = require( 'path');


const formularioCargaProductoController = {
    /* Con MVC + EJS */
    inicio: (req,res) => { res.render( ( 'views', 'formularioCargaProducto' ) ) },
    };
module.exports = formularioCargaProductoController;