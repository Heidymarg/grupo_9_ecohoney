const path = require( 'path');
const file = require( 'fs');

var productos = file.readFileSync( path.join(__dirname, '../', '/data/listadoProductosAbejas.json'), 'utf-8')
var productosJson = JSON.parse( productos );

const formularioCargaProductoController = {
    /* Con MVC + EJS */
    inicio: (req,res) => { res.render( ( 'views', 'formularioCargaProducto' ) ) },

    agregar: ( req,res) => {
        
        if ( req.body.desc != null && req.body.DescDeta !=null && req.body.linea != null && req.body.precio != null ) {
            let prod = { idPrd: null, desc: null, DescDeta: null, linea: null, precio: null, bonif: null, foto: null };
            prod.idPrd = productosJson.length + 1;
            prod.desc = req.body.desc; 
            prod.DescDeta = req.body.DescDeta; 
            prod.linea = req.body.linea; 
            prod.precio = req.body.precio; 
            prod.bonif = req.body.bonif; 
            prod.foto = req.body.foto;
        
            productosJson.push( prod );
            file.writeFileSync(path.join(__dirname, '../', '/data/listadoProductosAbejas.json'), JSON.stringify(productosJson));

            res.redirect('back');
        }
        
    }

};
  
module.exports = formularioCargaProductoController;