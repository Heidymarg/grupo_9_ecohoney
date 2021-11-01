const path = require('path');
/* con MVC
const loginController = {
login: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/login.html" ) ) },
};
*/
const loginController = {
<<<<<<< HEAD
    login:(req,res) => { res.render(( 'views', 'login' ) )},  
=======
    login:(req,res) => { res.render( path.resolve( 'views/users', 'login' ) ) },  
>>>>>>> a627a33d2305b0f1cfc2c02ed1ed651966c79fdc
    

};
module.exports = loginController;


