const express = require( 'express' );
const router = express.Router();
const multer = require('multer');
const path = require('path');

////Multer funciona NO TOCAR///
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/usuarios')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})



/* para sprint 5 */
const {check} = require('express-validator');
/* para sprint 5 */

const userController = require('../controllers/userControllers');

/* para sprint 5 */
let validacionDeRegistracion = require('../middlewares/validacionDeRegistracion');
let validacionDeModificacionUsuario = require('../middlewares/validacionDeModificacionUsuario');
const validacionDeInvitados = require('../middlewares/validacionDeInvitados');
const validacionDeUsuario = require('../middlewares/validacionDeUsuario');
/* para sprint 5 */



/////PARA AGREGAR USUARIOS/////

router.get('/registro', userController.registroMostrar);    
router.post('/registroGrabar',  upload.single('foto'),validacionDeRegistracion, userController.registroGrabar);

//////PARA MODIFICAR USUARIOS////////
router.get('/modificar/:id', userController.registroModificarMostrar);

<<<<<<< HEAD
router.post('/modificarGrabar/:id', upload.single('foto'), validacionDeModificacionUsuario,
 userController.registroModificarGrabar);
=======
router.post('/modificarGrabar/:id',upload.single('foto'),  validacionDeModificacionUsuario, userController.registroModificarGrabar);
>>>>>>> 431653c80a822100672a4c1de0517385b03716d0

///PARA ELIMINAR USUARIOS////////
router.get('/eliminar/:id', userController.registoEliminarConfirmar);
let validacionesEliminarUsuario = [
    check('idUsr').notEmpty().withMessage('Ingresar el Id de usuario a eliminar. Consultá Listar Usuarios').bail()
]
router.post('/eliminarGrabar/:id', validacionesEliminarUsuario, userController.registroEliminarGrabar);


router.get('/listar', userController.listar);

router.get('/login', userController.login);

let validacionDeLogin = [ 
    check('usuario').notEmpty().withMessage('Completar el usuario ').isEmail().withMessage('No es un nombre de usuario válido').bail(), 
    check('password').notEmpty().withMessage('Completar la Contraseña, mínimo 8 caracteres ').bail(), 
];
router.post('/login', validacionDeLogin, userController.validarUsuario);

router.get('/logout', userController.logout);

/* *** Rutas para gestionar los Perfiles de Usuario *** */
router.get('/perfil/listar', userController.listarPerfiles);
router.get('/perfil/agregar', userController.agregarPerfil);
let validacionDePerfil = [check('perfil').notEmpty().withMessage('Completar el campo nombre')];
router.post('/perfil/agregar', validacionDePerfil, userController.agregarGrabarPerfil);

router.get('/perfil/modificar', userController.modificarPerfil);
let validacionModificarPerfil = [ 
    check('perfil').notEmpty().withMessage('Completar el campo Descripción').bail()   
];
router.post('/perfil/modificar', validacionModificarPerfil, userController.confirmarModificarPerfil);
router.post('/perfil/modificar/:id', userController.modificarGrabarPerfil);

router.get('/perfil/eliminar', userController.eliminarPerfil);
let validacionEliminarPerfil = [check('perfil').notEmpty().withMessage('Completar el campo ').bail()];
router.post('/perfil/eliminar', validacionEliminarPerfil, userController.confirmarEliminarPerfil)
router.post('/perfil/eliminar/:id', validacionEliminarPerfil, userController.eliminarPerfil);

/* *** Rutas para gestionar los Integeses de Usuario *** */
router.get('/intereses/listar', userController.listarInteres);

router.get('/intereses/agregar', userController.agregarInteres);
let validacionDeIntereses = [check("interes").notEmpty().withMessage('Seleccionar el Interés o Intereses ').bail(),];
router.post('/intereses/agregar',validacionDeIntereses, userController.agregarGrabarInteres);
router.post('/intereses/agregar',validacionDeIntereses, userController.agregarGrabarInteres);

router.get('/intereses/modificar', userController.modificarInteres);
let validacionModificarInteres = [ 
    check('interes').notEmpty().withMessage('Completar el campo Descripción').bail()   
];
router.post('/intereses/modificar', validacionModificarInteres, userController.confirmarModificarInteres);
router.post('/intereses/modificar/:id', validacionModificarInteres, userController.modificarGrabarInteres);

router.get('/intereses/eliminar', userController.eliminarInteres);
let validacionEliminarInteres = [check('interes').notEmpty().withMessage('Completar el campo ').bail()];
router.post('/intereses/eliminar', validacionEliminarInteres, userController.confirmarEliminarInteres)
router.post('/intereses/eliminar/:id', validacionEliminarInteres, userController.eliminarInteres);

//router.get('/carrito', userController.carrito);


module.exports = router;
