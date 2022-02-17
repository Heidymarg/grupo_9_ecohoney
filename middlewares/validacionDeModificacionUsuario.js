const {check} = require('express-validator');
const validacionDeModificacion = require('./validacionDeModificacion');
    
module.exports = validacionDeModificacionUsuario = [
    check('user').notEmpty().withMessage('Completar el Nombre de Usuario').bail(), 
    check('email').notEmpty().withMessage('Completar el e-mail ').isEmail().withMessage('No es un email válido').bail(), 
    check('perfil').notEmpty().withMessage('Seleccionar alguna opción ').bail(),
    check('intereses').notEmpty().withMessage('Seleccionar una o más opciones ').bail(),
    //check('foto').notEmpty().withMessage('Subí una foto').bail(),
    check('pass').notEmpty().withMessage('Completar la Contraseña, mínimo 8 caracteres ').bail(), 
    check('pass_confirm').notEmpty().withMessage('Reingresar la Contraseña, mínimo 8 caracteres ').bail(),
    check('privacidad').notEmpty().withMessage('Completar el campo Términos y Condiciones de Privacidad ').bail()
];
