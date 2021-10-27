const express = require( 'express' );

const router = express.Router();

const mainLineaHogar = require( '../controllers/lineaHogarController.js' );

router.get( '/inicio', mainLineaHogar.inicio );

module.exports = router;