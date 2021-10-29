const path = require('path');
const carritoController = {
    carrito:(req,res) => { res.sendFile( path.join( __dirname, "../views/carrito.html" ) )} 
    
    

}



module.exports = carritoController;