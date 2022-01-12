const express = require( 'express' );
const router = express.Router();
const multer = require('multer');


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images')
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
const validacionDeInvitados = require('../middlewares/validacionDeInvitados');
const validacionDeUsuario = require('../middlewares/validacionDeUsuario');
/* para sprint 5 */

let validacionDeRegistracion = [ 
        check('nombre').notEmpty().withMessage('Completar el Nombre y Apellido').bail(), 
        check('user').notEmpty().withMessage('Completar el Nombre de Usuario').bail(), 
        check('email').notEmpty().withMessage('Completar el e-mail ').isEmail().withMessage('No es un email válido').bail(), 
        check('birth_date').notEmpty().withMessage('Ingresar la fecha ').bail(), 
        check('dni').notEmpty().withMessage('Completar DNI ').bail(), 
        check('addres').notEmpty().withMessage('Completar el Domicilio ').bail(),
        check('perfil').notEmpty().withMessage('Seleccionar alguna opción ').bail(),
        check('intereses').notEmpty().withMessage('Seleccionar una o más opciones ').bail(),
        check('avatar').notEmpty().withMessage('Subir foto de perfil ').bail(), 
        check('pass').notEmpty().withMessage('Completar la Contraseña, mínimo 8 caracteres ').bail(), 
        check('pass_confirm').notEmpty().withMessage('Reingresar la Contraseña, mínimo 8 caracteres ').bail(),
        check('privacidad').notEmpty().withMessage('Completar el campo Términos y Condiciones de Privacidad ').bail()
    ];

router.get('/registro', userController.registroMostrar);    
router.post('/registroGrabar', validacionDeRegistracion, upload.single('avatar'), userController.registroGrabar);

router.get('/modificar', validacionDeRegistracion, userController.registroModificarMostrar);
router.post('/modificarGrabar', upload.single('avatar'), userController.registroModificarGrabar);

router.get('/eliminar', validacionDeRegistracion, userController.registroEliminarMostrar);
router.post('/eliminarGrabar', userController.registroEliminarGrabar);

router.get('/listar', userController.listar);

router.get('/login', validacionDeInvitados, userController.login);

let validacionDeLogin = [ 
    check('usuario').notEmpty().withMessage('Completar el usuario ').isEmail().withMessage('No es un nombre de usuario válido').bail(), 
    check('password').notEmpty().withMessage('Completar la Contraseña, mínimo 8 caracteres ').bail(), 
];

//router.post('/login', validacionDeLogin, validacionDeUsuario,userController.validarUsuario);
router.post('/login', validacionDeLogin, userController.validarUsuario);

router.get('/logout', userController.logout);

/* *** Rutas para gestionar los Perfiles de Usuario *** */
router.get('/perfil/listar', userController.listarPerfiles);
router.get('/perfil/agregar', userController.agregarPerfil);
let validacionDePerfil = [check('perfil').notEmpty().withMessage('Completar el campo nombre')];
router.post('/perfil/agregar', validacionDePerfil, userController.agregarGrabarPerfil);
router.get('/perfil/modificar', userController.modificarPerfil);
router.post('/perfil/modificar', userController.modificarGrabarPerfil);

router.get('/perfil/eliminar', userController.eliminarPerfil);
let validacionEliminarPerfil = [ 
    check('perfil').notEmpty().withMessage('Completar el campo ').bail()   
];
router.post('/perfil/eliminar', validacionEliminarPerfil, userController.confirmarEliminarPerfil)
router.post('/perfil/eliminar/:id', validacionEliminarPerfil, userController.eliminarPerfil);

/* *** Rutas para gestionar los Integeses de Usuario *** */
router.get('/intereses/listar', userController.listarInteres);
router.get('/intereses/agregar', userController.agregarInteres);
let validacionDeIntereses = [check("interes").notEmpty().withMessage('Seleccionar el Interés o Intereses ').bail(),];


router.post('/intereses/agregar',validacionDeIntereses, userController.agregarGrabarInteres);
router.get('/intereses/modificar', userController.modificarInteres);
router.post('/intereses/modificar', userController.modificarGrabarInteres);
let validacionModificarInteres = [ 
    check('interes').notEmpty().withMessage('Completar el campo Descripción').bail()   
];
router.get('/intereses/modificar', userController.modificarInteres);
router.post('/intereses/modificar', validacionModificarInteres, userController.confirmarModificarInteres);
router.post('/intereses/modificar/:id', validacionModificarInteres, userController.modificarGrabarInteres);




router.get('/intereses/eliminar', userController.eliminarInteres);
let validacionEliminarInteres = [ 
    check('interes').notEmpty().withMessage('Completar el campo ').bail()   
];
router.post('/intereses/eliminar', validacionEliminarInteres, userController.confirmarEliminarInteres)
router.post('/intereses/eliminar/:id', validacionEliminarInteres, userController.eliminarInteres);

router.get('/carrito', userController.carrito);

module.exports = router;