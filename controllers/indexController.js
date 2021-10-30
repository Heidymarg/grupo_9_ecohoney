const path = require( 'path');
/* con MVC
const indexController = {
index: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/index.html" ) ) },
};
*/

const indexController = {
    /* Con MVC + EJS */
    index: (req,res) => { res.render( ( 'views', 'index' ) ) },
    };
module.exports = indexController;