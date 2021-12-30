const { request } = require('http');
const path = require('path');
const fileSys = require('fs');
const encripta = require('bcryptjs');
const { localsName } = require('ejs');
const { append } = require('express/lib/response');
    
const abejasFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
const listaOfertas = JSON.parse(fileSys.readFileSync(abejasFilepath, 'utf-8'));
const otrosProductosFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
const listaDeIndex = JSON.parse(fileSys.readFileSync(otrosProductosFilepath, 'utf-8'));

const usuariosFilepath = path.join(__dirname, '../data/usuarios.json');

const db = require('../database/models');
var esElUsuario = undefined;

const userController = {

    login: (req,res) => {
        res.render('login');
    },

    validarUsuario:(req,res) => { 
       
        // res.send('datos ingresados' + req.body.email + '  '+ req.body.password + ' ' + req.body.recordarme);
        const {validationResult} = require('express-validator');
        let error = validationResult( req ); 

        if (error.isEmpty()) {
        
            // 1_ busco el usuario en el archivo usuarios.json
            let usuariosArray = JSON.parse(fileSys.readFileSync(usuariosFilepath, 'utf8'));
            esElUsuario = usuariosArray.find( u => { return u.usuario == req.body.usuario } );

            // 2_ Si el usuario está registrado, verifico su password
            if ( esElUsuario != undefined ) {
                if ( encripta.compareSync( req.body.password, esElUsuario.password ) || (req.body.usuario != esElUsuario.usuario) ) {
                    
                    // 2.1_ guardo el usuario en  session (o sea, lo logueo) si NO ESTá logueado
                    if ( req.session.usuarioLogueado == undefined ) {
                        
                        req.session.usuarioLogueado = esElUsuario;
                             
                        // 2.2_ muestro datos de usuario en el header
                        // completar con código
                        
                        // 2.3_ muestro menu extendido en header
                        // completar con código
    
                        // 2.4_ Si tildó el recordarme
                        if ( req.body.recordarme == undefined ) {
                            // 2.4.1_ activo cookie
                            res.cookie('usuarioRecordado', esElUsuario.usuario, { maxAge: 24 * 60 * 60 * 1000 });
                        } 
                        
                        // 2.5_ redirecciono a Home
                        console.log(`Usuario ${esElUsuario.usuario} logueado! `);
                        res.render('indexProtegido', {'usuarioLogueado': esElUsuario,  'listado': listaDeIndex,'listadoOfertas': listaOfertas}); 
                        
                    } else { // el usuario ya estaba logueado, lo redirecciono a HOME protegido
                        res.render('indexProtegido', {'usuarioLogueado': esElUsuario,  'listado': listaDeIndex,'listadoOfertas': listaOfertas}); 
                    }      
                } else {
                    // 2.6_ El usuario ingresó mal la password o el nombre de usuario, redirecciona a login
                    res.render('login', {'resultadoValidaciones': [{msg:'Usuario o Contraseña inválidos '}], 'datosAnteriores': req.body});
                }
            } else { // el usuario no está registrado, entonces es un GUEST, se redirecciona al HOME.
                res.redirect('/');    

            }
        } else { // datos inválidos en el login.
            res.render('login', {'resultadoValidaciones': error.mapped(), 'datosAnteriores': req.body});
        }
        
    },  
    
    registroGrabar:(req,res) => {
        
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
                //bcrypt = require('bcryptjs');
                passOculta = encripta.hashSync( req.body.pass_confirm, 10 );
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

        } else { //hay errores
            // no anda rellenar los campos correctos de la carga anterior.
            return res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body});
        } 
    },
    registroMostrar: (req,res) => { 
        //return res.render('registro');
        res.render('registro', {'datosAnteriores': req.body} );
    },

    registroModificarMostrar: (req,res) => { 
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );
        res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body} );
    },
    registroModificarGrabar:(req,res) => { 
        //return res.render('registro', {'datosAnteriores': req.body} );
        res.send("Usuarios modificar grabar  - en construcción ")
    },

    registroEliminarGrabar:(req,res) => { 
        //return res.render('registro');
        res.send("Usuarios eliminar grabar - en construcción ")
    },
    registroEliminarMostrar: (req,res) => { 
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );
        res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body} );
    },

    listar: (req,res) => { res.send("Usuarios Listar - en construcción ") },

    logout: (req,res) => {

        if ( esElUsuario != undefined ) {
            console.log(`Finalizó sesión el Usuario: ${esElUsuario.usuario} `);
        }

        res.clearCookie('usuarioRecordado');
        res.redirect('/');
        res.session.destroy();
        
    },

    /* *** Métodos para atender la gestin de perfiles e intereses de usuarios *** */
    listarPerfiles: (req,res) => {res.send("Perfiles Listar - Página en construcción!!!")},
    agregarPerfil: (req,res) =>{ 

        res.render("perfilAgregar")
    //res.send("Perfiles Agregar - Página en construcción!!!")// 
},
    agregarGrabarPerfil: (req,res) => {
        
        let {validationResult} = require('express-validator');
		let errores = validationResult(req);
		if(errores.isEmpty()){
			/* la lógica para grabar a BD */
			db.perfiles.create( { nombre: req.body.perfil } );	
			//res.send(req.body.linea)
		} else {
			res.render('perfilAgregar', {'resultadoValidaciones': errores.mapped()});
			
		}
        //res.send("Perfiles Agregar Grabar - Página en construcción!!!") 
    },
    modificarPerfil: (req,res) => {res.send("PERFILES Modificar - Página en construcción!!!")},
    modificarGrabarPerfil: (req,res) => {res.send("Perfiles Modificar Grabar - Página en construcción!!!")},
    eliminarPerfil: (req,res) => {res.send("Perfiles Eliminar - Página en construcción!!!")},
    eliminarGrabarPerfil: (req,res) => {res.send("PErfiles Eliminar Grabar - Página en construcción!!!")},

    listarInteres: (req,res) => {res.send("Intereses Listar - Página en construcción!!!")},
    agregarInteres: (req,res) => {res.send("Intereses Agregar - Página en construcción!!!")},
    agregarGrabarInteres: (req,res) => {res.send("Intereses Agregar Grabar- Página en construcción!!!")},
    modificarInteres: (req,res) => {res.send("Intereses Modificar - Página en construcción!!!")},
    modificarGrabarInteres: (req,res) => {res.send("Intereses Modificar Grabar - Página en construcción!!!");},
    eliminarInteres: (req,res) => {res.send("Intereses Eliminar - Página en construcción!!!")},
    eliminarGrabarInteres: (req,res) => {res.send("Intereses Eliminar Grabar - Página en construcción!!!")}
};
module.exports = userController;
