const express = require('express');

const router = express.Router();

 const registroController= require('../controllers/registroController.js');

//router.get('/', registro.registro);
router.get('/registro', registroController.registro);

module.exports = router;



