const express = require( 'express' );
const productController = require('../controllers/productControllers');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/products')
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

router.get('/formProducts', productController.productoAgregar);

router.get('/carrito', productController.carrito);

/*** CREATE ONE PRODUCT ***/ 
//**router.get('/productoAgregar', productController.productoAgregar); **/
router.post('/', upload.any(), productController.grabar); 


/*** GET ONE PRODUCT ***/ 
router.get('/detalle/:id', productController.detalle); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.editar); 
router.patch('/edit/:id', upload.any(),productController.modificar); 

/* DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productController.eliminar);

module.exports = router;