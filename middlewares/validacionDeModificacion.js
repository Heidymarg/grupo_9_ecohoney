const {check} = require('express-validator');
const validacionDeModificacionUsuario = require('./validacionDeModificacionUsuario');
    
<<<<<<< HEAD
module.exports = validacionDeModificacion = [
=======
module.exports = 
   modificacionDeProductos = [
>>>>>>> f168409e2d540aaff9077877e2b6547878022e49
    check('codigo').notEmpty().withMessage('Completar el Código del Producto').bail(), 
    check('nombre').notEmpty().withMessage('Completar el Nombre del Producto').bail(), 
    check('descripcion').notEmpty().withMessage('Completar la descripción ').bail(), 
    check('linea').notEmpty().withMessage('Seleccionar una o más opciones').bail(), 
    check('precio').notEmpty().withMessage('Asignar el Precio ').bail(), 
    check('bonif').notEmpty().withMessage('Completar la bonificación ').bail(),
<<<<<<< HEAD
    check('foto').notEmpty().withMessage('Subir foto del producto').bail(),
    check('cantidad').notEmpty().withMessage('Completar la cantidad ').bail(),
     
];
=======
   // check('foto').notEmpty().withMessage('Subir foto del producto').bail(),
    check('cantidad').notEmpty().withMessage('Completar la cantidad ').bail(),
     
]
>>>>>>> f168409e2d540aaff9077877e2b6547878022e49
