const { request } = require('http');
const path = require('path');
const encripta = require('bcryptjs');
const { localsName } = require('ejs');
const { append, cookie } = require('express/lib/response'); 
const {validationResult, body} = require('express-validator');
const db = require('../database/models');

const { Op, where } = require('sequelize');
const res = require('express/lib/response');
const { Router } = require('express');

/* Para modificar usuario */
var usuarioAModificar = undefined;
var usuarioSeleccionado = undefined;
/* Fin Para modificar usuario */

/* Para validar logging de usuario */
var usuarioLogueado = undefined;
var recordarme = undefined;

var usuarioPerfil = undefined;
/* Fin para validar logging */

var idPerfilParaEliminar= undefined; 

var perfiles = db.perfiles.findAll();
var intereses = db.intereses.findAll();
var todosLosUsuarios = db.usuarios.findAll();

var listaDeIndex = db.productos.findAll();
var listaOfertas = db.productos.findAll();

var carrito = [];
var total = 0;

const userController = {

    login: (req,res) => {
        //ok no tocar.
        res.render('login');
    },
    validarUsuario:(req,res) => { 
        //ok no tocar.
    
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
                        
                        req.session.usuarioAceptado = resultado[0].dataValues.usuario;
                        console.log( "Guarda sesión de:  " + req.session.usuarioAceptado );
                        usuarioLogueado =  resultado[0].dataValues;       

                        // 2.2.1_ Si tildó el recordarme
                        if ( req.body.recordarme != undefined ) { // activo cookie
                            recordarme = req.body.recordarme;
                            res.cookie('usuarioRecordado', usuarioLogueado.usuario, { maxAge: 24 * 60 * 60 * 1000 }); // 24hs dura la cookie { maxAge: 24 * 60 * 60 * 1000 }
                        } 
                        
                        db.perfiles.findByPk(usuarioLogueado.id_perfil)
                        .then( suPerfil => { 
                            
                            usuarioPerfil = suPerfil.nombre;
                            if ( suPerfil != undefined ) {
                                // 2.2.1_ El perfil del usuario es:
                                res.cookie('suPerfil', suPerfil.nombre, { maxAge: 24 * 60  * 60 * 1000 });
                                req.session.suPerfil = suPerfil.nombre;
                                console.log(`Usuario ${usuarioLogueado.usuario} logueado!!! con perfil ${suPerfil.nombre}`);

                                if ( suPerfil.nombre == 'Administrador') {   
                                    // Redirecciona a vista con menú gestión de usuarios.
                                    db.productos.findAll()
                                    .then( listaDeIndex => { res.render('indexProtegido', {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil, 'listado': listaDeIndex, 'listadoOfertas': listaDeIndex}); } )                                
                                } else if ( suPerfil.nombre =='Vendedor' ) {
                                        //Mostrar vista con menú Gestión de Productos//
                                        db.productos.findAll()
                                        .then( listaDeIndex => { res.render('indexProtegido', {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil , 'listado': listaDeIndex, 'listadoOfertas': listaDeIndex}); } )
                                    } else if(suPerfil.nombre == 'Comprador') {
                                            // Inicializar el CARRITO.
                                            res.cookie( 'carrito_' + req.session.usuarioAceptado, {}, { maxAge: 2 * 60 * 1000 });
                                            //Mostrar vista HOME= index.js
                                            db.productos.findAll()
                                            .then( listaDeIndex => {
                                                res.render('indexProtegido', {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil , 'listado': listaDeIndex, 'listadoOfertas': listaDeIndex});
                                            } )
                                        } else {
                                            // Es un invitado. Mostrar vista para invitados.
                                            res.send( `Vista de ${suPerfil}` )
                                        }
                            } else {
                                console.log( `Perfil ${suPerfil} no encontrado`)
                            } 
                        }); // fin de db.perfiles.findAll( { where:{ id_perfil: esElUsuario.id_perfil } } )
                        
                    } else { // 2.4_ El usuario ingresó mal la password o el nombre de usuario, redirecciona a login
                        res.render('login', {'resultadoValidaciones': [{
                            value: 'invalido',
                            msg: 'Usuario o Contraseña incorrecto',
                            param: 'validarUsuario',
                            location: 'userController'
                          }, {msg:'Usuario o Contraseña incorrecto '}], 'datosAnteriores': req.body});
                        console.log('Entro por distinto/incorrecto usuario o pasword');
                    }
                } else { // 2.5_ el usuario no está registrado/es indefined, se redirecciona al Login.
                    res.render('login', {'resultadoValidaciones': [{
                        value: 'noregistrado',
                        msg: 'Usuario no registrado',
                        param: 'validarUsuario',
                        location: 'userController'
                      },{msg:'Usuario no registrado '}], 'datosAnteriores': req.body});
                    console.log('Usuario no resitrado.');
                }
            
            }); // fin de db.usuarios.findAll({where:{usuario: req.body.usuario}})

        } else { // datos incompletos en el login.
            res.render('login', {'resultadoValidaciones': error.mapped(), 'datosAnteriores': req.body});
            console.log('Datos incompletos en el login.')
        }

        return usuarioLogueado;
        
    },  
    /* ******************** Para cargar usuario nuevo********************* */
    registroGrabar:(req,res) => {
        //ok no tocar.
        console.log(req.body )
        var errores = validationResult( req );

        if ( errores.isEmpty() ) { // no hay errores
            console.log( 'Entró por errores  empty' + errores )
            
            if ( req.file.filename != undefined ) {

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
                    id_carrito: null,
                    foto: '/images/usuarios/' + req.file.filename
                } );
                Promise.all([perfiles,intereses])
                .then( ([perfiles,intereses]) => {
                    res.render('registro', {'datosAnteriores': req.body, 'perfiles':perfiles, 'intereses':intereses, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });          
                } )
                    
            } else { // falta cargar la foto
                console.log( errores )
                Promise.all([perfiles,intereses])
                .then( ([perfiles,intereses]) => {
                    errores.push( {
                        value: undefined,
                        msg: 'Falta Cargar la Foto ',
                        param: 'foto',
                        location: 'file'
                      })
                    res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'perfiles': perfiles, 'intereses': intereses, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
                } )
            }  
        } else { //hay errores
            console.log( errores )
            Promise.all([perfiles,intereses])
            .then( ([perfiles,intereses]) => {
                res.render('registro', {'resultadoValidaciones': errores.mapped(), 'datosAnteriores': req.body, 'datosAnteriores': req.body, 'perfiles': perfiles, 'intereses': intereses, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
            } )
        } 
    },

    /* Para cargar Usuario nuevo */
    registroMostrar: (req,res) => { 
        //ok no tocar.
        Promise.all([perfiles,intereses])
        .then( ([perfiles,intereses]) => {
            res.render('registro', {'datosAnteriores': req.body, 'perfiles':perfiles, 'intereses':intereses, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });          
        } ) 
    },
    /* ************** Modifcar Usuarios **************** */
    registroModificarMostrar: (req,res) => { 
        // ok no tocar
        const {validationResult} = require('express-validator');
        let errores = validationResult( req );  

       usuarioSeleccionado = db.usuarios.findByPk( req.params.id );
       Promise.all((promesas = [perfiles, intereses, usuarioSeleccionado]))
       .then( (promesas) => {
            res.render('registroModificar', { 'resultadoValidaciones':errores.mapped(),'datosAnteriores': req.body, 'perfiles':promesas[0], 'intereses':promesas[1], 'usuarioSeleccionado': promesas[2], 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } );
            return usuarioSeleccionado = promesas[2];
        })

    },
    registroModificarGrabar:(req,res) => {
        // ok no tocar
        
            const {validationResult} = require('express-validator');
            let errores = validationResult( req );
            // ok res.send('usuario a modificar ' + usuarioSeleccionado.idUsr )
            
                let passOculta;
                if ( req.body.pass === req.body.pass_confirm ) {
                    passOculta = encripta.hashSync( req.body.pass_confirm, 10 );
                }
    
                if ( errores.isEmpty()) {
                    db.usuarios.update({
                        usuario: req.body.user,
                        email: req.body.email,
                        id_perfil: req.body.perfil,
                        id_intereses: req.body.intereses,
                        foto:'/images/usuarios/' + req.file.filename,
                        password: passOculta
                    }, {
                        where : { idUsr : usuarioSeleccionado.idUsr }
                    })
                    .then( 
                        db.usuarios.findAll()
                        .then( resultado => { 
                            return res.render('listadoUsuarios', {'listaDeUsuarios': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
                        } )
                    )
                } else {
                    intereses= db.intereses.findAll();
                    perfiles= db.perfiles.findAll(); 
                    Promise.all((promesas = [perfiles, intereses, usuarioSeleccionado]))
                    .then( resultado => { 
                        return res.render('registroModificar', { 'datosAnteriores': req.body, 'perfiles':promesas[0], 'intereses':promesas[1], 'usuarioSeleccionado': promesas[2], 'resultadoValidaciones': errores.mapped(), 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
                    } )
                    
                }
                
        },
    /* ************** FinModifcar Usaurios *************** */

    /* ********************* Eliminar Usuario ********************** */
    registoEliminarConfirmar: (req, res) => {
        //ok  no tocar

        db.usuarios.findByPk( req.params.id )
        .then( resultado => {
                res.render('registroEliminar', {'userAEliminar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil  });
                return usuarioSeleccionado = resultado;
        } );

    },
    registroEliminarGrabar: function(req, res) { 
        // ok no tocar.
        
        db.usuarios.findByPk( usuarioSeleccionado.idUsr )
        .then( resultado => 
        {   
            if ( resultado != undefined ) { 
                db.usuarios.destroy( {where: { idUsr : resultado.idUsr}} );
            } 
		} )
        .then( 
            
            db.usuarios.findAll()
            .then( resultado => { 
                return res.render('listadoUsuarios',{listaDeUsuarios: resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil  });
            } )
        );
        
    },
    /* ******************* Fin - Eliminar Usuario ******************* */
    /* ********Para listar usuarios********************/ 
    listar: (req,res) => { 

        db.usuarios.findAll()
        .then( resultado => { 
            res.render('listadoUsuarios', {'listaDeUsuarios': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
        } );
    },

    logout: (req,res) => {

        if ( usuarioLogueado != undefined ) {
            console.log(`Finalizó sesión el Usuario: ${usuarioLogueado.usuario} `);
            console.log(`Cookies almacenadas: ${req.cookies}`);
        }

        if ( recordarme == undefined ) {
            res.clearCookie('usuarioRecordado');
            res.clearCookie('suPerfil');
            req.session.destroy();    
        }
        res.redirect('/');        
    },

    /* *** Métodos para atender la gestión de perfiles e intereses de usuarios *** */
    listarPerfiles: (req,res) => {     
            db.perfiles.findAll()
            .then( resultado => { 
            res.render('listarPerfiles', {'perfiles': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil })
            })
    },	
    agregarPerfil: (req,res) =>{
        res.render("perfilAgregar", {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil})
    },
    agregarGrabarPerfil: (req,res) => {
        
        
		let errores = validationResult(req);
		if(errores.isEmpty()){
			db.perfiles.create( { nombre: req.body.perfil } );	
		} else {
			res.render('perfilAgregar', {'resultadoValidaciones': errores.mapped(), 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
			
		}
    },

    modificarPerfil: (req,res) => {
        let	perfilAModificar = { "id_perfil": null, "nombre": null };
		res.render( "perfilesModificar", {'perfilAModificar':perfilAModificar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
    },
    confirmarModificarPerfil: function(req,res) {
		let	perfilAModificar = { "id_perfil": null, "nombre": null }; 
		
        db.perfiles.findByPk( req.body.perfil )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("perfilesModificar", {'perfilAModificar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 	
			} else {
				res.render("perfilesModificar", {'perfilAModificar': { id_perfil: "-1", nombre: " no existe!!! " }, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 
			}
		} );
		
		return idPerfilParaModificar = req.body.perfil;
	},
    modificarGrabarPerfil: function(req,res) {
		
		let errores = validationResult(req);
		
		db.perfiles.findByPk( idPerfilParaModificar )
		.then( resultado => {
			db.perfiles.update( {nombre: req.body.nombre}, {where: {id_perfil : resultado.id_perfil}} ); 
			let	perfilAModificar = { "id_perfil": null, "nombre": null }; 
			res.render('perfilesModificar', {'perfilAModificar':perfilAModificar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil }) } )	
	},

    eliminarPerfil: function(req,res) {
		let	perfilesEliminar = { "id_perfil": null, "nombre": null }; 
		res.render("perfilesEliminar", {'perfilAEliminar': perfilesEliminar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
	},  
    confirmarEliminarPerfil: function(req,res) {
		let	perfilesEliminar = { "id_perfil": null, "nombre": null }; 
		db.perfiles.findByPk( req.body.perfil )
		.then( resultado => { 
			if ( resultado != undefined ) { 
                db.perfiles.destroy({where: { id_perfil:idPerfilParaEliminar}})
				res.render("perfilesEliminar", {'perfilAEliminar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 
         
			} else {
				res.render("perfilesEliminar", {'perfilAEliminar': { id_perfil: "-1", nombre: " no existe!!! " }, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 
			}
		} );
		return idPerfilParaEliminar = req.body.perfil
    },

    listarInteres: function(req,res) {
		db.intereses.findAll()
		.then( resultado => { res.render( "interesesListar", {intereses: resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) } )
	},
    agregarInteres: (req,res) =>{res.render("interesesAgregar", {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil} )},
        
    agregarGrabarInteres: (req, res) => {                              

        
        let errores = validationResult(req);
        if(errores.isEmpty()){
            db.intereses.create( { nombre: req.body.interes } );	
        } else {
            res.render('interesesAgregar', {'resultadoValidaciones': errores.mapped(), 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
            
        }

    },

    modificarInteres: function(req,res) {
		let	interesAModificar = { "id_intereses": null, "nombre": null };
		res.render( "interesesModificar", {'interesAModificar':interesAModificar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
	},
    confirmarModificarInteres: function(req,res) {
		let	interesAModificar = { "id_intereses": null, "nombre": null }; 
		db.intereses.findByPk( req.body.intereses )
		.then( resultado => { 
			if ( resultado != undefined ) {
				res.render("interesesModificar", {'interesAModificar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 	
			} else {
				res.render("interesesModificar", {'interesAModificar': { id_intereses: "-1", nombre: " no existe!!! " }, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 
			}
		} );
        return idInteresParaModificar = req.body.intereses;
	},
    modificarGrabarInteres: function(req,res) {
		
		let errores = validationResult(req);
		
		db.intereses.findByPk( idInteresParaModificar )
		.then( resultado => {
			db.intereses.update( {nombre: req.body.nombre}, {where: {id_intereses : resultado.id_intereses}} ); 
			let	interesAModificar = { "id_intereses": null, "nombre": null }; 
			res.render('interesesModificar', {'interesAModificar':interesAModificar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil }) } )	
            
	},
    
    eliminarInteres: function(req,res) {
		let	interesesEliminar = { "id_intereses": null, "nombre": null }; 
		res.render("interesesEliminar", {'interesesAEliminar': interesesEliminar, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil });
	},
    confirmarEliminarInteres: function(req,res) {
		let	interesesEliminar = { "id_intereses": null, "nombre": null }; 
		db.intereses.findByPk( req.body.intereses )
		.then( resultado => { 
			if ( resultado != undefined ) {
                db.intereses.destroy({where: {id_intereses : idInteresParaEliminar}})
				res.render("interesesEliminar", {'interesesAEliminar': resultado, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 	
			} else {
				res.render("interesesEliminar", {'interesesAEliminar': { id_intereses: "-1", nombre: " no existe!!! " }, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil } ) 
			}
		} );
		return idInteresParaEliminar = req.body.intereses
    },
    
    /* ************** CARRITO *************** */
    carritoMostrar: function(req, res) {
       
        if ( req.session.suPerfil == 'Comprador') {
            res.render('carrito', {'carrito': carrito, 'totalCompra': total, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil, 'cookies': res.cookies});
        } else {
            console.log("No tiene perfil para carrito ")
        } 
               
    },
    carritoAgregarItem: function(req, res) {

        if ( req.session.suPerfil == 'Comprador') {
            //res.cookie( req.params.idPrd, req.body.quantity, { maxAge: 24 * 60  * 60 * 1000 });
            db.productos.findByPk( req.params.idPrd )
            .then(
                item => {
                    carrito.push({id: req.params.idPrd, nombre: item.nombre, cantidad: req.body.quantity, precioU: item.precio})
                    total += req.body.quantity * item.precio;
                }
            ).catch( error => console.log( error))
            
            //res.render('carrito', {'carrito': carrito, 'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil, 'cookies': res.cookies});
            db.productos.findAll()
            .then( listaDeIndex => { res.render('indexProtegido', {'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil , 'listado': listaDeIndex, 'listadoOfertas': listaDeIndex}); } )
            
            console.log("Producto agregado al Carrito")
            console.log( "Cookies Cargadas: " + req.cookies);
        } else {
            console.log("No tiene perfil para carrito")
        }      
    },
    carritoSacarItem: function(req, res) {
        
        if ( req.session.suPerfil === 'Comprador') {
            //res.clearCookie( req.params.idPrd );
            
            carrito = carrito.filter( item != req.params.idPrd );
            res.render('carrito', {'carrito': carrito,  'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil, 'cookies': res.cookies});
            console.log("Producto eliminado del Carrito")
            console.log( "Cookies Cargadas: " + req.cookies );
        } else {
            console.log("No tiene perfil para carrito")
        }
        
     },
    carritoVaciar: function( req,res) {
        carrito = [];
        total = 0;
        res.render('carrito', {'carrito': carrito, 'totalCompra': total ,'usuarioLogueado':req.session.usuarioAceptado, 'usuarioPerfil':req.session.suPerfil, 'cookies': res.cookies});
    },
    carritoComprar : function( req, res) {

        if ( req.session.suPerfil === 'Comprador') {
            if ( carrito.length > 0) {
                res.send("Compra Confirmada - Reenvío a Medios de Pago. Total a Pagar $: " + total)
                console.log("Compra Confirmada")
            } else {
                res.send("El Carrito está vacío!!!")
            }
        } else {
            console.log("No tiene perfil para carrito")
        }
    }
    /* ************ FIN CARRITO ************* */    
} 

module.exports = userController;
