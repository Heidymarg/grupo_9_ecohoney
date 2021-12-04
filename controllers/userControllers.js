const { request } = require('http');
const path = require('path');
    

const userController = {
    login:(req,res) => { 
        res.render('login') 
    },  
    
    registro:(req,res) => {
        
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );

        if ( errores.isEmpty() ) { // no hay errores
            // logica de registro ==> grabar cada campo
            // a archivo usuario.json
            return res.send( 'Datos ingresados ' + req.body.name + ' ' + req.body.user + ' ' + req.body.email 
            + ' ' + req.body.birth_date + ' ' + req.body.dni + ' ' + req.body.addres + ' ' + req.body.perfil
            + ' ' + req.body.intereses + ' ' + req.body.avatar + ' ' + req.body.pass + ' ' 
            + req.body.pass_confirm + ' ' + req.body.privacidad );
        } else { //hay errores
            return res.render('registro', {'resultadoValidaciones': errores.mapped(), 'formAnterior': req.body});
            //return res.send( 'Hay errores ' + errores.array() );
            //return res.send( 'Hay errores ' + errores.array().length );
        }      
    },

    mostrar:(req,res) => { 
        return res.render('registro')
    }

};
module.exports = userController;
