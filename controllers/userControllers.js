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
            // logica de registro ==> 
            // generar id a partir del length del archivo usuarios.json
            // agregar el usuario al array de usuarios
            // grabar el array a archivo usuario.json
            let bcrypt;
            let passOculta;
            if ( req.body.pass === req.body.pass_confirm ) {
                bcrypt = require('bcryptjs');
                passOculta = bcrypt.hashSync( req.body.pass_confirm, 10 );
            }
            return res.send( 'Datos ingresados sin errores: ' + req.body.nombre + ' ' + req.body.user + ' ' + req.body.email 
            + ' ' + req.body.birth_date + ' ' + req.body.dni + ' ' + req.body.addres + ' ' + req.body.perfil
            + ' ' + req.body.intereses + ' ' + req.body.avatar + ' ' + req.body.pass + ' ' 
            + req.body.pass_confirm + ' ' + req.body.privacidad + ' Contraseña encriptada: ' + passOculta );
        } else { //hay errores
            return res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body});
        } 
    },

    mostrar:(req,res) => { 
        return res.render('registro', {'datosAnteriores': req.body} );
    }

};
module.exports = userController;
