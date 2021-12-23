const express = require( 'express' );
const productController = require('../controllers/productControllers');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check} = require('express-validator');



var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})


router.get('/detalle', productController.detalle);

router.get('/lineaCuidadoPersonal', productController.inicioCuidadoPersonal);

router.get('/lineaProductoDeLasAbejas', productController.inicioAbejas);

router.get('/lineaHogar', productController.inicioHogar);

router.get('/carrito', productController.carrito);

/* *** Listar todos los productos *** */
router.get('/listar', productController.listar);

/*** Agregar nuevo producto ***/ 
let validacionModificacion = [
    check('codigo').isEmpty().withMessage('Completar el campo').bail(),
    check('nombre').isEmpty().withMessage('Completar el campo').bail(),
    check('Descripcion').isEmpty().withMessage('Completar el campo').bail(),
    check('linea').isEmpty().withMessage('Falta cargar la Línea de Producto').bail(),
    check('precio').isEmpty().withMessage('Falta cargar el Precio').bail(),
    check('bonif').isEmpty().withMessage('Falta cargar la Bonificación').bail(),
    check('foto').isEmpty().withMessage('Falta subir una foto').bail()
];
router.get('/productoAgregar', validacionModificacion, productController.productoMostrarFormCarga);
router.post('/lineaProductoDeLasAbejas', validacionModificacion, upload.single('foto'), productController.grabar); 

/*** Mostrar datos de un producto ***/ 
router.get('/detalle/:id', productController.detalle); 

/*** EDIT ONE PRODUCT ***/ 
/*
22/12/2021 Falta la validación de campos del sprint 5
y la logica para grabar a DB del sprint 6
*/
router.get('/productoModificar', productController.productoMostrarFormModificar ); 
router.post('/productoModificar', productController.traerParaModificar);
router.patch('/edit/:id', upload.single('foto'),productController.modificar); 

/* *** Eliminar un producto *** */ 
router.get('/productoDelete', productController.productoMostrarFormEliminar );  // ruta que lleva al form.

router.post('/productoDelete', productController.traerParaConfirmar); // ruta que invoca al método que, dado un idPrd, 
                                                            // devuelve datos para confirmación previa a la eliminación.
router.delete('/productoDelete/:idPrd', productController.eliminar);       // ruta que invoca al método que efectivamente elimina
                                                            // el ítem seleccionado.

/* *** Rutas para atender la gestión de Líneas de productos *** */
router.get('/linea/listar', productController.listarLinea);

let validacionLineaNueva = [ 
    check('linea').notEmpty().withMessage('Completar el campo ').bail()   
];
router.get('/linea/agregar',validacionLineaNueva, productController.agregarLinea);
router.post('/linea/agregar',validacionLineaNueva, productController.agregarGrabarLinea);
router.get('/linea/modificar', productController.modificarLinea);
router.post('/linea/modificar', productController.modificarGrabarLinea);
router.get('/linea/eliminar', productController.eliminarLinea);
router.post('/linea/eliminar', productController.eliminarGrabarLinea);

module.exports = router;