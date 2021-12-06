const express = require( 'express' );
const router = express.Router();

/* para sprint 5 */
const {check} = require('express-validator');
/* para sprint 5 */

const userController = require('../controllers/userControllers');

/* para sprint 5 */
const validacionDeInvitados = require('../middlewares/validacionDeInvitados');
const validacionDeUsuario = require('../middlewares/validacionDeUsuario');
/* para sprint 5 */

router.get('/registro', userController.mostrar);
router.get('/registro', userController.profile);

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

router.post('/registro', validacionDeRegistracion, userController.registro);

router.get('/login', validacionDeInvitados, userController.login);

let validacionDeLogin = [ 
    check('usuario').notEmpty().withMessage('Completar el usuario ').isEmail().withMessage('No es un nombre de usuario válido').bail(), 
    check('password').notEmpty().withMessage('Completar la Contraseña, mínimo 8 caracteres ').bail(), 
];

//router.post('/login', validacionDeLogin, validacionDeUsuario,userController.validarUsuario);
router.post('/login', validacionDeLogin, userController.validarUsuario);

router.get('/logout', userController.logout);

module.exports = router;