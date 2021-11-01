const path = require('path');

/* con MVC
const registroController = {
registro: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/registro.html" ) ) },
};
*/

const registroController = {
    registro:(req,res) => { res.render( path.resolve( 'views/users', 'registro') )},
    
    

};

module.exports = registroController;


