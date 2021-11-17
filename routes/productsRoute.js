const express = require( 'express' );
const productController = require('../controllers/productControllers');
const router = express.Router();

router.get('/detalle', productController.detail);

router.get('/lineaCuidadoPersonal', productController.inicioCuidadoPersonal);

router.get('/lineaProductoDeLasAbejas', productController.inicioAbejas);

router.get('/lineaHogar', productController.inicioHogar);

router.get('/formProducts', productController.productAdd);

router.get('/carrito', productController.carrito);

module.exports = router;