const path = require('path');
/*con MVC
const controladorProductoDetallado = {
    raiz:(req,res) => { res.sendFile( path.join( __dirname, "../views/productoDetallado.html" ) )} 
    
}*/


const controladorProductoDetallado = {
    raiz:(req,res) => { res.render(path.resolve('views/products', 'productoDetallado') )},

};

module.exports = controladorProductoDetallado;



