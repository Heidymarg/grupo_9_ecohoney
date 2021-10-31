const express = require('express');

const router = express.Router();

 const registro= require('../controllers/registroController.js');

router.get('/registro', registro.registro);

module.exports = router;



