const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

//Rutas
//Lista de usuarios
router.get('/', usersApiController.listar);

//Ultimo usuario registrado
router.get('/lastUser', usersApiController.ultimo);

//Detalle del usuario
router.get('/:id', usersApiController.detalle);

module.exports = router;