const express = require( 'express' );
const indexController = require('../controllers/mainControllers');
const router = express.Router();

router.get('/', indexController.index);

module.exports = router;