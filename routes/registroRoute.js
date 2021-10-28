const express = require('express');

const routerRegistro = express.Router();
const mainRegistro = require('../controllers/registroController.js');

routerRegistro.get('/registro', mainRegistro.registro);

module.exports = routerRegistro;