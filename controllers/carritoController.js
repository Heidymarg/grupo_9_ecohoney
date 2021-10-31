const path = require('path');

/* con MVC
const carritoController = {
carrito: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/carrito.html" ) ) },
};
*/

const carritoController = {
    carrito:(req,res) => { res.render(( 'views', 'carrito')) },
    
    

};
module.exports = carritoController;

