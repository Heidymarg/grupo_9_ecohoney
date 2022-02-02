const { request } = require('http');
const path = require('path');
const fileSys = require('fs');
const encripta = require('bcryptjs');
const { localsName } = require('ejs');
const { append } = require('express/lib/response');
    

const db = require('../database/models');

const { Op, where } = require('sequelize');

var esElUsuario = undefined;

/* Para modificar usuario */
var usuarioAModificar = undefined;
var usuarioSeleccionado = undefined;
/* Fin Para modificar usuario */


var idPerfilParaEliminar= undefined; 

var perfiles = db.perfiles.findAll();
var intereses = db.intereses.findAll();
var todosLosUsuarios = db.usuarios.findAll();

var listaDeIndex = db.productos.findAll();
var listaOfertas = db.productos.findAll();

const userController = {

    login: (req,res) => {
        //ok no tocar.
        res.render('login');
    },
    validarUsuario:(req,res) => { 
        //ok no tocar.
        const {validationResult} = require('express-validator');
        let error = validationResult( req ); 

        if (error.isEmpty()) {
        
            // 1_ Busco el usuario en  la DB //
            db.usuarios.findAll({where:{usuario: req.body.usuario}})
            .then(resultado => { 
                
                esElUsuario = resultado[0].dataValues; 
                
                // 2_ Si el usuario está registrado
                if ( esElUsuario != undefined ) {

                    //2.1_ Verifico su password
                    if ( encripta.compareSync( req.body.password, esElUsuario.password )||
                        (req.body.usuario != esElUsuario.usuario) ) {
                    
                        var suPerfil = undefined;
                        db.perfiles.findAll( { where:{ id_perfil: esElUsuario.id_perfil } } )
                        .then( resultado => {
                            
                            suPerfil = resultado[0].dataValues.nombre;
                           
                            console.log(`Usuario ${esElUsuario.usuario} logueado!!! su perfil es ${suPerfil}`);

                            // 2.2_ guardo el usuario en  session (o sea, lo logueo) si NO ESTá logueado
                            if ( req.session.usuarioLogueado == undefined ) {
                                // 2.2.1_ Si tildó el recordarme
                                req.session.usuarioLogueado = esElUsuario.usuario;
                                if ( req.body.recordarme == undefined ) { // activo cookie
                                    res.cookie('usuarioRecordado', esElUsuario.usuario, { maxAge: 24 * 60 * 60 * 1000 });
                                } 
                            }
                       
                            // ok hasta acá res.send( "Datos de Usuario correctamente ingresados : " + esElUsuario.usuario + " Su perfil es: " + suPerfil );
                            
                            if ( suPerfil == 'Administrador') {   
                                // 2.2.1_ es usuario Administrador, va a indexProtegido
                                db.productos.findAll()
                                .then( listaDeIndex => {res.render('indexProtegido', {'usuarioLogueado': esElUsuario.usuario, 'usuarioPerfil': suPerfil, 'listado': listaDeIndex, 'listadoOfertas': listaDeIndex}); } )                                
                            } else { 
                                // 2.2.2_ no es Administrador, va a index de compradores y vendedores
                                db.productos.findAll()
                                .then( listaDeIndex => {res.render('index', {'usuarioLogueado': esElUsuario.usuario,  'listado': listaDeIndex,'listadoOfertas': listaDeIndex});} )
                            } 
                            
                            return suPerfil;
                        
                        }); // fin de db.perfiles.findAll( { where:{ id_perfil: esElUsuario.id_perfil } } )
      
                    } else { // 2.4_ El usuario ingresó mal la password o el nombre de usuario, redirecciona a login
                        res.render('login', {'resultadoValidaciones': [{msg:'Usuario o Contraseña inválidos '}], 'datosAnteriores': req.body});
                        console.log('Entro por distinto/incorrecto usuario o pasword');
                    }
                } else { // 2.5_ el usuario no está registrado o es indefined, se redirecciona al HOME.
                    res.redirect('/');    
                }
            
            }); // fin de db.usuarios.findAll({where:{usuario: req.body.usuario}})

        } else { // datos inválidos o incompletos en el login.
            res.render('login', {'resultadoValidaciones': error.mapped(), 'datosAnteriores': req.body});
        }
        
    },  

    registroGrabar:(req,res) => {
        //ok no tocar.
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );

        if ( errores.isEmpty() ) { // no hay errores

            // 1_ verifico igualdad de passwords y las encripto
            let bcrypt;
            let passOculta;
            if ( req.body.pass === req.body.pass_confirm ) {
                passOculta = encripta.hashSync( req.body.pass_confirm, 10 );
            }

            // 4_ grabo el usuario a tabla
            db.usuarios.create( {
                usuario : req.body.user,
                email : req.body.email,
                id_perfil : req.body.perfil,
                id_intereses : req.body.intereses,
                password : passOculta,
                foto:'/images/users/' + req.body.foto
            } );

            Promise.all([perfiles,intereses])
            .then( ([perfiles,intereses]) => {
                res.render('registro', {'datosAnteriores': req.body, 'perfiles':perfiles, 'intereses':intereses});          
            } )

        } else { //hay errores
            Promise.all([perfiles,intereses])
            .then( ([perfiles,intereses]) => {
                res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'perfiles': perfiles, 'intereses': intereses});
            } )
        } 
    },

    /* Para modificar usuario */
    registroMostrar: (req,res) => { 
        //ok no tocar.
        Promise.all([perfiles,intereses])
        .then( ([perfiles,intereses]) => {
            res.render('registro', {'datosAnteriores': req.body, 'perfiles':perfiles, 'intereses':intereses});          
        } ) 
    },

    registroModificarMostrar: (req,res) => { 
        // ok no tocar
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );

        Promise.all([perfiles, intereses, todosLosUsuarios])
        .then( ([perfiles, intereses, todosLosUsuarios]) => {
            res.render('registroModificar', {'perfiles':perfiles, 'intereses':intereses, 'datosAnteriores': req.body, 'todosLosUsuarios': todosLosUsuarios, 'usuarioSeleccionado': undefined} );
        } )    
       
    },
    registroModificarSeleccionar:( req,res) => {
        // ok no tocar        
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );

        db.usuarios.findAll( { where: { usuario: {[Op.eq] : req.body.todosLosUsuarios} } } )
        .then(resultado => {
            usuarioSeleccionado = resultado[0].idUsr;
            console.log( 'Id usr selecionado para modificar: ' + usuarioSeleccionado );
            if ( resultado.length == 0 ) {
                res.send("Seleccioná un usuario de la lista!!! ")
            } else {
                Promise.all([perfiles, intereses, todosLosUsuarios])
                .then( ([perfiles, intereses, todosLosUsuarios]) => {
                    res.render('registroModificar', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'perfiles':perfiles, 'intereses':intereses, 'todosLosUsuarios': todosLosUsuarios[0], 'usuarioSeleccionado': resultado[0]} );
                })              
            }
        })           
    },
    registroModificarGrabar:(req,res) => {
        // ok no tocar
        let passOculta;
            if ( req.body.pass === req.body.pass_confirm ) {
                passOculta = encripta.hashSync( req.body.pass_confirm, 10 );
            }

        db.usuarios.update({
            usuario: req.body.user,
            email: req.body.email,
            id_perfil: req.body.perfil,
            id_intereses: req.body.intereses,
            password: passOculta,
            foto:'/images/users/' + req.body.foto

        }, {
            where : { idUsr : usuarioSeleccionado }
        }).then( resultado => {
            const {validationResult} = require('express-validator');
            let errores = validationResult( req );

            Promise.all([perfiles, intereses, todosLosUsuarios])
            .then( ([perfiles, intereses, todosLosUsuarios]) => {
                res.render('registroModificar', {'perfiles':perfiles, 'intereses':intereses, 'datosAnteriores': req.body, 'todosLosUsuarios': todosLosUsuarios, 'usuarioSeleccionado': undefined} );
            } )
        })
        
    },
    /* Fin Para modificar usuario */

    /* Eliminar Usuario */
    registroEliminarMostrar: (req,res) => { 
        //const {validationResult} = require('express-validator');
        //let errores = validationResult( req );
        let userAEliminar = {
            "idUsr": null,
            "nombre": null,
            "usuario": null,
            "email": null,
            "fechaNac": null,
            "dni": null,
            "domicilio": null,
            "perfil": null,
            "intereses": null,
            "foto": null,
            "password": null,
            "privacidad": null
        };
        res.render('registroEliminar', {'userAEliminar': userAEliminar} );
    },
    registoEliminarConfirmar: (req, res) => {

        let userAEliminar = {
            "idUsr": "No existe",
            "nombre": "No existe",
            "usuario": "No existe",
            "email": null,
            "fechaNac": null,
            "dni": null,
            "domicilio": null,
            "perfil": null,
            "intereses": null,
            "foto": null,
            "password": null,
            "privacidad": null
        };

        db.usuarios.findByPk( req.body.idUsr )
        .then( resultado => {
            if ( resultado != undefined ) {
                usuarioSeleccionado = resultado;
                res.render('registroEliminar', {'userAEliminar': usuarioSeleccionado});
            } else {
                res.render('registroEliminar', {'userAEliminar': userAEliminar});
            }
        } )
        return usuarioSeleccionado;
    },
    registroEliminarGrabar: function(req, res) { 

        let userAEliminar = {
            "idUsr": "No existe",
            "nombre": "No existe",
            "usuario": "No existe",
            "email": null,
            "fechaNac": null,
            "dni": null,
            "domicilio": null,
            "perfil": null,
            "intereses": null,
            "foto": null,
            "password": null,
            "privacidad": null
        };

        console.log( 'Usuario a eliminar ' + usuarioSeleccionado.idUsr);
        db.usuarios.findByPk( usuarioSeleccionado.idUsr )
        .then( resultado => {   
                            if ( resultado != undefined ) { 
                                db.usuarios.destroy( {where: { idUsr : resultado.idUsr}} );
                            } 
                            res.render('registroEliminar', {'userAEliminar': userAEliminar});
		                    } );    
        
    },

    listar: (req,res) => { 

        db.usuarios.findAll()
        .then( resultado => { 
            res.render('listadoUsuarios', {'listaDeUsuarios': resultado});
            //res.render('listadoUsuarios', {'listaDeUsuarios': {idUsr: null, usuario: null, email: null}});
        } );
    },

    logout: (req,res) => {

        if ( esElUsuario != undefined ) {
            console.log(`Finalizó sesión el Usuario: ${esElUsuario.usuario} `);
        }

        res.clearCookie('usuarioRecordado');
        res.redirect('/');
        req.session.destroy();
        
    },

    /* *** Métodos para atender la gestión de perfiles e intereses de usuarios *** */
    listarPerfiles: (req,res) => {     
            db.perfiles.findAll()
            .then( resultado => { 
            res.render('listarPerfiles', {'perfiles': resultado})
            })
    },	
    agregarPerfil: (req,res) =>{
        res.render("perfilAgregar")
    },
    agregarGrabarPerfil: (req,res) => {
        
        let {validationResult} = require('express-validator');
		let errores = validationResult(req);
		if(errores.isEmpty()){
			db.perfiles.create( { nombre: req.body.perfil } );	
		} else {
			res.render('perfilAgregar', {'resultadoValidaciones': errores.mapped()});
			
		}
    },

    modificarPerfil: (req,res) => {
        let	perfilAModificar = { "id_perfil": null, "nombre": null };
		res.render( "perfilesModificar", {'perfilAModificar':perfilAModificar});
    },
    confirmarModificarPerfil: function(req,res) {
		let	perfilAModificar = { "id_perfil": null, "nombre": null }; 
		
        db.perfiles.findByPk( req.body.perfil )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("perfilesModificar", {'perfilAModificar': resultado} ) 	
			} else {
				res.render("perfilesModificar", {'perfilAModificar': { id_perfil: "-1", nombre: " no existe!!! " }} ) 
			}
		} );
		
		return idPerfilParaModificar = req.body.perfil;
	},
    modificarGrabarPerfil: function(req,res) {
		let {validationResult} = require('express-validator');
		let errores = validationResult(req);
		
		db.perfiles.findByPk( idPerfilParaModificar )
		.then( resultado => {
			db.perfiles.update( {nombre: req.body.nombre}, {where: {id_perfil : resultado.id_perfil}} ); 
			let	perfilAModificar = { "id_perfil": null, "nombre": null }; 
			res.render('perfilesModificar', {'perfilAModificar':perfilAModificar}) } )	
	},

    eliminarPerfil: function(req,res) {
		let	perfilesEliminar = { "id_perfil": null, "nombre": null }; 
		res.render("perfilesEliminar", {'perfilAEliminar': perfilesEliminar});
	},  
    confirmarEliminarPerfil: function(req,res) {
		let	perfilesEliminar = { "id_perfil": null, "nombre": null }; 
		db.perfiles.findByPk( req.body.perfil )
		.then( resultado => { 
			if ( resultado != undefined ) { 
                db.perfiles.destroy({where: { id_perfil:idPerfilParaEliminar}})
				res.render("perfilesEliminar", {'perfilAEliminar': resultado} ) 
         
			} else {
				res.render("perfilesEliminar", {'perfilAEliminar': { id_perfil: "-1", nombre: " no existe!!! " }} ) 
			}
		} );
		return idPerfilParaEliminar = req.body.perfil
    },

    listarInteres: function(req,res) {
		db.intereses.findAll()
		.then( resultado => { res.render( "interesesListar", {intereses: resultado} ) } )
	},
    agregarInteres: (req,res) =>{res.render("interesesAgregar")},
        
    agregarGrabarInteres: (req, res) => {                              

        let {validationResult} = require('express-validator');
        let errores = validationResult(req);
        if(errores.isEmpty()){
            db.intereses.create( { nombre: req.body.interes } );	
        } else {
            res.render('interesesAgregar', {'resultadoValidaciones': errores.mapped()});
            
        }

    },

    modificarInteres: function(req,res) {
		let	interesAModificar = { "id_intereses": null, "nombre": null };
		res.render( "interesesModificar", {'interesAModificar':interesAModificar});
	},
    confirmarModificarInteres: function(req,res) {
		let	interesAModificar = { "id_intereses": null, "nombre": null }; 
		db.intereses.findByPk( req.body.intereses )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("interesesModificar", {'interesAModificar': resultado} ) 	
			} else {
				res.render("interesesModificar", {'interesAModificar': { id_intereses: "-1", nombre: " no existe!!! " }} ) 
			}
		} );
        return idInteresParaModificar = req.body.intereses;
	},
    modificarGrabarInteres: function(req,res) {
		let {validationResult} = require('express-validator');
		let errores = validationResult(req);
		
		db.intereses.findByPk( idInteresParaModificar )
		.then( resultado => {
			db.intereses.update( {nombre: req.body.nombre}, {where: {id_intereses : resultado.id_intereses}} ); 
			let	interesAModificar = { "id_intereses": null, "nombre": null }; 
			res.render('interesesModificar', {'interesAModificar':interesAModificar}) } )	
            
	},
    
    eliminarInteres: function(req,res) {
		let	interesesEliminar = { "id_intereses": null, "nombre": null }; 
		res.render("interesesEliminar", {'interesesAEliminar': interesesEliminar});
	},
    confirmarEliminarInteres: function(req,res) {
		let	interesesEliminar = { "id_intereses": null, "nombre": null }; 
		db.intereses.findByPk( req.body.intereses )
		.then( resultado => { 
			if ( resultado != undefined ) {
                db.intereses.destroy({where: {id_intereses : idInteresParaEliminar}})
				res.render("interesesEliminar", {'interesesAEliminar': resultado} ) 	
			} else {
				res.render("interesesEliminar", {'interesesAEliminar': { id_intereses: "-1", nombre: " no existe!!! " }} ) 
			}
		} );
		return idInteresParaEliminar = req.body.intereses
    },
    
    /*
    carrito = function() {
        
        db.usuarios.findAll( {
                where: { id_usuario : esElUsuario.idUsr}
        } )
        .then( resultado => { 
            localStorage.setItem('carritoUsuarioLogueado', resultado.idUsr);
            return `Carrito creado para el usuarios ${resultado.nombre}`; 
        } )
        
    }
    */
} 

module.exports = userController;
