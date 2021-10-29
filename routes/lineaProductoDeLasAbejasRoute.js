const express = require( 'express' );

const router = express.Router();

const mainLineaProductoDeLasAbejas = require( '../controllers/lineaProductoDeLasAbejasController.js' );

router.get('/inicio', mainLineaProductoDeLasAbejas.inicio );

module.exports = router;