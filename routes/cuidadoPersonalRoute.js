const express = require( 'express' );

const router = express.Router();

const mainCuidadoPersonal = require( '../controllers/cuidadoPersonalController.js' );

router.get('/inicio', mainCuidadoPersonal.inicio );

module.exports = router;