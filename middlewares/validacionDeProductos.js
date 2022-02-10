const {check} = require('express-validator');
    
<<<<<<< HEAD
module.exports = validacionDeProductos = [
  check('codigo').notEmpty().withMessage('Ingresar un Código de producto').bail(),
  check('nombre').notEmpty().withMessage('Ingresar un Nombre de producto')
  .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres').bail(),
  check('descripcion').notEmpty().withMessage('Ingresar una descripción de producto')
  .isLength({min: 20}).withMessage('La descripción debe tener al menos 20 caracteres').bail(),
  check('lineas').notEmpty().withMessage('Seleccionar una Línea de Producto').bail(),
  check('precio').notEmpty().withMessage('Falta cargar el Precio').bail(),
  check('bonif').notEmpty().withMessage('Falta cargar la Bonificación').bail(),
  check('cantidad').notEmpty().withMessage('Ingresar un stock inicial').bail(),
  //heck('foto').notEmpty().withMessage('Falta subir una foto de producto').bail()
];

  
 
=======
module.exports = 
   validacionDeProductos = [
    check('codigo').notEmpty().withMessage('Completar el Código del Producto').bail(), 
    check('nombre').notEmpty().withMessage('Completar el Nombre del Producto').bail(), 
    check('descripcion').notEmpty().withMessage('Completar la descripción ').bail(), 
    check('linea').notEmpty().withMessage('Seleccionar una o más opciones').bail(), 
    check('precio').notEmpty().withMessage('Asignar el Precio ').bail(), 
    check('bonif').notEmpty().withMessage('Completar la bonificación ').bail(),
    //check('foto').notEmpty().withMessage('Subir foto del producto').bail(),
    check('cantidad').notEmpty().withMessage('Completar la cantidad ').bail(),
     
]
>>>>>>> f168409e2d540aaff9077877e2b6547878022e49
