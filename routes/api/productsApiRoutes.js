const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController');

//Rutas
//Lista de usuarios
router.get('/', productsApiController.listar)

//Ulitmo Producto
router.get('/lastProducts', productsApiController.ultimo)

//Detalle del usuario
router.get('/:id', productsApiController.detalle)


module.exports = router;