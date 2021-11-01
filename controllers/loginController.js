const path = require('path');
/* con MVC
const loginController = {
login: (req,res) => { res.sendFile( path.resolve( __dirname, "../views/login.html" ) ) },
};
*/
const loginController = {
    login:(req,res) => { res.render( path.resolve( 'views/users', 'login' ) ) },  
    

};
module.exports = loginController;


