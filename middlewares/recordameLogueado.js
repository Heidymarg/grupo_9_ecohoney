const db = require('../database/models');

const { Op, where } = require('sequelize');

function recordameLogueado(req, res, next) {

    if ( req.body.recordarme != undefined ) { // activo cookie

        if ( req.cookies.usuarioRecordado != undefined ) {
            db.usuarios.findAll( {where: {usuario : req.cookies.usuarioRecordado}} )
            .then( resultado => { 
                if ( req.cookies.usuarioRecordado == resultado.usuario ) {
                    req.session.usuarioLogueado = req.cookies.usuarioRecordado;
                }    
            })
            .catch( error => console.log(error))
        }
        
    }   
    
    next();

}

module.exports = recordameLogueado;