const express = require( 'express' );
const productController = require('../controllers/productControllers');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const {check} = require('express-validator');


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images')
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

/* *** Listar todos los productos *** */
router.get('/listar', productController.listar);

/*** Agregar nuevo producto ***/ 
let validacionDeProductos = require('../middlewares/validacionDeProductos');
router.get('/productoAgregar', productController.productoMostrarFormCarga);
router.post('/agregarProducto', validacionDeProductos, upload.single('foto'), productController.grabar); 

/*** Mostrar datos de un producto ***/ 
router.get('/detalle/:id', productController.detalle); 

router.get('/productoModificar', productController.productoMostrarFormModificar ); 
router.post('/productoModificar', productController.traerParaModificar);
router.patch('/edit/:id', upload.single('foto'), productController.modificar); 

/* *** Eliminar un producto *** */ 
router.get('/productoDelete', productController.productoMostrarFormEliminar );  // ruta que lleva al form.

router.post('/productoDelete', productController.traerParaConfirmar); // ruta que invoca al método que, dado un idPrd, 
                                                            // devuelve datos para confirmación previa a la eliminación.
router.delete('/productoDelete/:idPrd', productController.eliminar);       // ruta que invoca al método que efectivamente elimina
                                                            // el ítem seleccionado.
/* * Rutas para atender la gestión de Líneas de productos * */
router.get('/linea/listar', productController.listarLinea);

router.get('/linea/agregar', productController.agregarLinea);
let validacionLineaNueva = [ 
    check('linea').notEmpty().withMessage('Completar el campo Descripción').bail()   
];
router.post('/linea/agregar',validacionLineaNueva, productController.agregarGrabarLinea);

let validacionModificarLinea = [ 
    check('linea').notEmpty().withMessage('Completar el campo Descripción').bail()   
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

router.get('/buscar', productController.buscar );
router.post('/buscar', productController.buscar);

module.exports = router;