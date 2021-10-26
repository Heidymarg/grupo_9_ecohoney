const path = require('path');
const controladorProductoDetallado = {
    raiz:(req,res) => { res.sendFile( path.join( __dirname, "../views/productoDetallado.html" ) )} 
    
    

}



module.exports = controladorProductoDetallado;