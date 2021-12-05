const { request } = require('http');
const path = require('path');
const fileSys = require('fs');
    
const usuariosFilepath = path.join(__dirname, '../data/usuarios.json')

const userController = {
    login:(req,res) => { 
        res.render('login') 
    },  
    
    registro:(req,res) => {
        
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );

        if ( errores.isEmpty() ) { // no hay errores
            // logica de alta de usuario ==> 
            // 1_ leo el archivo de usuarios y lo paso a array
            let usuariosArray = JSON.parse(fileSys.readFileSync(usuariosFilepath, 'utf8'));
            
            // 2_ genero id a partir del length del archivo usuarios.json
            let nuevoUsuario = {idUsr: null,
                                nombre: null,
                                usuario: null,
                                email: null,
                                fechaNac: null,
                                dni: null,
                                domicilio: null,
                                perfil: null,
                                intereses: null,
                                foto: null,
                                password: null,
                                privacidad: null};

            nuevoUsuario.idUsr = usuariosArray.length + 1;
            
            // 3_ verifico igualdad de passwords y las encripto
            let bcrypt;
            let passOculta;
            if ( req.body.pass === req.body.pass_confirm ) {
                bcrypt = require('bcryptjs');
                passOculta = bcrypt.hashSync( req.body.pass_confirm, 10 );
            }

            // 4_ Cargo los datos del form en el usuario nuevo
            nuevoUsuario.nombre = req.body.nombre;
            nuevoUsuario.usuario = req.body.user;
            nuevoUsuario.email = req.body.email;
            nuevoUsuario.fechaNac = req.body.birth_date;
            nuevoUsuario.dni = req.body.dni;
            nuevoUsuario.domicilio = req.body.addres;
            nuevoUsuario.perfil = req.body.perfil;
            nuevoUsuario.intereses = req.body.intereses;
            nuevoUsuario.foto = req.body.avatar;
            nuevoUsuario.password = passOculta;
            nuevoUsuario.privacidad = req.body.privacidad;
            
            // 5_ agrego el usuario nuevo al array de usuarios
            usuariosArray.push( nuevoUsuario );

            // 6_ grabo el array a archivo usuario.json
            fileSys.writeFileSync(path.join( __dirname, '../', '/data/usuarios.json'), JSON.stringify(usuariosArray), 'utf8');

            return res.redirect('registro');
            //return res.send( 'Datos ingresados sin errores: ' + nuevoUsuario.idUsr + ' ' + nuevoUsuario.usuario );
            //return res.send( 'Datos ingresados sin errores: ' + req.body.nombre + ' ' + req.body.user + ' ' + req.body.email 
            //+ ' ' + req.body.birth_date + ' ' + req.body.dni + ' ' + req.body.addres + ' ' + req.body.perfil
            //+ ' ' + req.body.intereses + ' ' + req.body.avatar + ' ' + req.body.pass + ' ' 
            //+ req.body.pass_confirm + ' ' + req.body.privacidad + ' IdUsr ' + nuevoUsuario.idUsr + ' Contraseña encriptada: ' + passOculta );
            // res.redirect('registro');
        } else { //hay errores
            // no anda rellenar los campos correctos de la carga anterior.
            return res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body});
        } 
    },

    mostrar:(req,res) => { 
        return res.render('registro', {'datosAnteriores': req.body} );
    }

};
module.exports = userController;
