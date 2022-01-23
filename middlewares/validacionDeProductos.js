const {check} = require('express-validator');
    
module.exports = [
  check('codigo').isEmpty().withMessage('Completar el campo').bail(),
  check('nombre').isEmpty().withMessage('Completar el campo').bail(),
  check('descripcion').isEmpty().withMessage('Completar el campo').bail(),
  check('linea').isEmpty().withMessage('Falta cargar la Línea de Producto').bail(),
  check('precio').isEmpty().withMessage('Falta cargar el Precio').bail(),
  check('bonif').isEmpty().withMessage('Falta cargar la Bonificación').bail(),
  check('cantidad').isEmpty().withMessage('Falta subir una foto').bail()
];
 