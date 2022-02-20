const express = require('express');
const router = express.Router();

const lineasApiController = require('../../controllers/api/lineasApiController');

//Cantidad de Líneas de Productos
router.get('/lineas/cantLineas', lineasApiController.cantLineas);

module.exports = router;
