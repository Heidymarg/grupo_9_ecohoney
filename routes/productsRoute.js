const express = require( 'express' );
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productController = require('../controllers/productControllers');

const {check} = require('express-validator');


var validacionDeProducto = require('../middlewares/validacionDeProductos');
var validacionDeModificacion = require('../middlewares/validacionDeModificacion');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})

/* ***** Buscar Producto ***** */
router.get('/buscar', productController.buscar );
router.post('/buscar', productController.buscar);

/* ******* Rutas a Categorías/Líneas de Productos ********* */
router.get('/lineaCuidadoPersonal', productController.inicioCuidadoPersonal);

router.get('/lineaProductoDeLasAbejas', productController.inicioAbejas);

router.get('/lineaHogar', productController.inicioHogar);

/* ******************************************* */
/* ****** Gestión de productos productos ***** */
/* ******************************************* */
router.get('/listar', productController.listar);

/*** Agregar nuevo producto ***/ 
///Funcionan LAS VALIDACIONES DE BACK END Y FRONT END NO TOCAR///
router.get('/productoAgregar', productController.productoMostrarFormCarga);
router.post('/agregarProducto', upload.single('foto') ,validacionDeProducto, productController.grabar); 

/*** Mostrar datos de un producto ***/ 
router.get('/detalle/:id', productController.detalle); 
router.get('/detalle', productController.detalle);

/* *** Modificar producto *** */ 
///Funcionan LAS VALIDACIONES DE BACK END Y FRONT END NO TOCAR///
router.get('/productoModificar/:id', productController.productoMostrarFormModificar ); 
router.post('/edit/:id',  upload.single('foto'), validacionDeModificacion, productController.modificar); 

/* *** Eliminar un producto *** */ 
router.get('/productoDelete/:id', productController.productoMostrarFormEliminar );  // ruta que lleva al form.                                                          // devuelve datos para confirmación previa a la eliminación.
router.post('/productoDelete/:id', productController.eliminar);     // ruta que invoca al método que efectivamente elimina
                                                                    // el ítem seleccionado.

/* ******************************************************** */
/* * Rutas para atender la gestión de Líneas de productos * */
/* ******************************************************** */
router.get('/linea/listar', productController.listarLinea);

router.get('/linea/agregar', productController.agregarLinea);
let validacionLineaNueva = [ 
    check('linea').notEmpty().withMessage('Completar el campo Descripción').bail()   
];
router.post('/linea/agregar',validacionLineaNueva, productController.agregarGrabarLinea);

let validacionModificarLinea = [ 
    check('linea').notEmpty().withMessage('Completar el campo Descripción')
    .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres').bail()   
];
router.get('/linea/modificar', productController.modificarLinea);
router.post('/linea/modificar', validacionModificarLinea, productController.confirmarModificarLinea);
router.post('/linea/modificar/:id', validacionModificarLinea, productController.modificarGrabarLinea);

router.get('/linea/eliminar', productController.mostrarEliminarLinea);
let validacionEliminarLinea = [ 
    check('linea').notEmpty().withMessage('Completar el campo ').bail()   
];
router.post('/linea/eliminar', validacionEliminarLinea, productController.confirmarEliminarLinea)
router.post('/linea/eliminar/:id', validacionEliminarLinea, productController.eliminarGrabarLinea);

module.exports = router;