const path = require('path');

/* con MVC
const registroController = {
registro: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/registro.html" ) ) },
};
*/

const registroController = {
<<<<<<< HEAD
    registro:(req,res) => { res.render(('views' ,'registro') )},
=======
    registro:(req,res) => { res.render( path.resolve( 'views/users', 'registro') )},
>>>>>>> a627a33d2305b0f1cfc2c02ed1ed651966c79fdc
    
   };

module.exports = registroController;





