const {check} = require('express-validator');
const validacionDeModificacionUsuario = require('./validacionDeModificacionUsuario');
    
module.exports = 
   modificacionDeProductos = [
    check('codigo').notEmpty().withMessage('Completar el Código del Producto').bail(), 
    check('nombre').notEmpty().withMessage('Completar el Nombre del Producto').bail(), 
    check('descripcion').notEmpty().withMessage('Completar la descripción ').bail(), 
    check('linea').notEmpty().withMessage('Seleccionar una o más opciones').bail(), 
    check('precio').notEmpty().withMessage('Falta cargar el Precio')
    .isString('precio').withMessage("Debe ser un valor numérico").bail(),
    check('bonif').notEmpty().withMessage('Falta cargar la Bonificación')
    .isString('bonif').withMessage("Debe ser un valor numérico").bail(),
    check('cantidad').notEmpty().withMessage('Ingresar un stock inicial')
    .isString('cantidad').withMessage("Debe ser un valor entero").bail(),     
]
