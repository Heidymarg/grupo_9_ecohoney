const {check} = require('express-validator');
    
module.exports = [
  check('codigo').notEmpty().withMessage('Ingresar un Código de producto').bail(),
  check('nombre').notEmpty().withMessage('Ingresar un Nombre de producto')
  .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres').bail(),
  check('descripcion').notEmpty().withMessage('Ingresar una descripción de producto')
  .isLength({min: 20}).withMessage('La descripción debe tener al menos 20 caracteres').bail(),
  check('linea').notEmpty().withMessage('Seleccionar una Línea de Producto').bail(),
  check('precio').notEmpty().withMessage('Falta cargar el Precio')
  .isString('precio').withMessage("Debe ser un valor numérico").bail(),
  check('bonif').notEmpty().withMessage('Falta cargar la Bonificación')
  .isString('bonif').withMessage("Debe ser un valor numérico").bail(),
  check('cantidad').notEmpty().withMessage('Ingresar un stock inicial')
  .isString('cantidad').withMessage("Debe ser un valor entero").bail(),
  //check('foto').notEmpty().withMessage('Falta subir una foto de producto').bail() se valida en el controlador
];

  
 
