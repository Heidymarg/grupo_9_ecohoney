const db = require('../database/models');
const encripta = require('bcryptjs');
const {validationResult, body} = require('express-validator');
const { localsName } = require('ejs');

function validacionDeUsuario(req, res, next){

  let error = validationResult( req ); 

  if (error.isEmpty()) {
        
    // 1_ Busco el usuario en  la DB //
    db.usuarios.findAll({where:{usuario: req.body.usuario}})
    .then(resultado => { 
        
        // 2_ Si el usuario está registrado
        if ( resultado.length != 0 ) {
          //2.1_ Verifico su password
          if ( encripta.compareSync( req.body.password, resultado[0].dataValues.password ) ) {                    
              // ok hasta acá. Datos de Usuario correctamente ingresados.
              // 2.2_ guardo el usuario en  session (o sea, lo logueo) si NO ESTá logueado
              
              /*
                req.session = {'idUsr': resultado[0].dataValues.isUsr};
                req.session = {'usuario': resultado[0].dataValues.usuario};
                req.session = {'email': resultado[0].dataValues.email};
                req.session = {'id_perfil': resultado[0].dataValues.id_perfil};
                req.session = {'id_intereses': resultado[0].dataValues.id_intereses};
                req.session = {'password': resultado[0].dataValues.id_intereses};
                req.session = {'id_carrito': resultado[0].dataValues.id_carrito};
                req.session = {'foto': resultado[0].dataValues.foto};
              */
               
          }
        }
    })
  }

  next();
}
    
module.exports = validacionDeUsuario;



