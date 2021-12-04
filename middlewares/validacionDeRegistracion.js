const {check} = require('express-validator');

let validacionDeRegistracion = [ 
        check('nombre').notEmpty().withMessage('Completar el campo ').bail(), 
        check('user').notEmpty().withMessage('Completar el campo ').bail(), 
        check('email').notEmpty().withMessage('Completar el e-mail ').isEmail().withMessage('No es un email').bail(), 
        check('birth_date').notEmpty().withMessage('Ingresar la fecha ').bail(), 
        check('dni').notEmpty().withMessage('Completar DNI ').isNumeric().withMessage('Sólo números ').bail(), 
        check('addres').notEmpty().withMessage('Completar el campo ').bail(),
        check('perfil').notEmpty().withMessage('Seleccionar alguna opción ').bail(),
        check('intereses').notEmpty().withMessage('Seleccionar una o más opciones ').bail(),
        check('avatar').notEmpty().withMessage('Subier foto de perfil ').bail(), 
        check('pass').notEmpty().withMessage('Completar el campo, minnimo 8 caracteres ').bail(), 
        check('pass_confirm').notEmpty().withMessage('Completar el campo, minnimo 8 caracteres ').bail(),
        check('privacidad').notEmpty().withMessage('Completar el campo ').bail()
    ];
    
exports.module = validacionDeRegistracion;

