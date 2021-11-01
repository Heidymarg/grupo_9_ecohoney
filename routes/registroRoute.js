const express = require('express');

const router = express.Router();

 const registroController= require('../controllers/registroController.js');

<<<<<<< HEAD
router.get('/registro', registroController.registro);
=======
//router.get('/', registro.registro);
router.get('/registro', registro.registro);
>>>>>>> a627a33d2305b0f1cfc2c02ed1ed651966c79fdc

module.exports = router;



