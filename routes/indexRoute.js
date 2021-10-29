const express = require( 'express' );

const router = express.Router();

const index = require( '../controllers/indexController.js' );

router.get('/', index.index);

module.exports = router;