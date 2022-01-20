
const db = require('../database/models');

const sequelize = db.sequelize;
const op = db.Sequelize.Op;

const indexController = {

index: (req,res) => { 

        db.productos.findAll()
        .then( (resultado) => {
            res.render( 'index', { 'listado': resultado, 'listadoOfertas': resultado }) 
        
        })            

    }   
}
    module.exports = indexController;