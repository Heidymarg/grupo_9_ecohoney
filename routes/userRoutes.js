const express = require( 'express' );
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/registro', userController.registro);

router.get('/login', userController.login);

module.exports = router;