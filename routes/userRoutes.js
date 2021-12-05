const express = require( 'express' );
const router = express.Router();

const userController = require('../controllers/userControllers');

//const validacionDeRegistracion = require('../middlewares/validacionDeRegistracion');
const {check} = require('express-validator');


router.get('/registro', userController.mostrar);

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

router.get('/login', userController.login);
router.post('/login', userController.login);

module.exports = router;