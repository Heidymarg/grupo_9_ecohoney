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
router.get('/productoAgregar', productController.productoMostrarFormCarga);
router.post('/lineaProductoDeLasAbejas', upload.single('foto'), productController.grabar); 

/*** Mostrar datos de un producto ***/ 
router.get('/detalle/:id', productController.detalle); 

/*** EDIT ONE PRODUCT ***/ 
// falta leer el producto desde el archivo, pasarlo a JSON,
// modificar el campo
// hacer un stringify y grabar a arcchivo.
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

let validacionModificarLinea = [ 
    check('linea').notEmpty().withMessage('Completar el campo ').bail()   
];
router.get('/linea/modificar', productController.modificarLinea);
router.post('/linea/modificar',validacionModificarLinea ,  productController.modificarGrabarLinea);

let validacionEliminarLinea = [ 
    check('linea').notEmpty().withMessage('Completar el campo ').bail()   
];

router.get('/linea/eliminar', validacionEliminarLinea, productController.eliminarLinea);

router.post('/linea/eliminar/:id', validacionEliminarLinea, productController.eliminarGrabarLinea);

module.exports = router;