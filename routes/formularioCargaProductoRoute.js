const express = require( 'express' );

const router = express.Router();



const formularioCargaProductoController = require( '../controllers/formularioCargaProductoController.js' );

router.get('/', formularioCargaProductoController.inicio);


module.exports = router;