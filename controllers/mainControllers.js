
const db = require('../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;

//const usuarioValidado = require('../controllers/userControllers');

const indexController = {

index: (req,res) => { 

    console.log( req.session )
        db.productos.findAll()
        .then( (resultado) => {
            //res.render( 'index', { 'listado': resultado, 'listadoOfertas': resultado, 'usuarioLogueado':usuarioValidado }) 
            res.render( 'index', { 'listado': resultado, 'listadoOfertas': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil }) 
        
        })            

    }   
}
    module.exports = indexController;