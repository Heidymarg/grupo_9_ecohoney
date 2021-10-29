const express = require('express');

const routerCarrito = express.Router();
const mainCarrito = require('../controllers/carritoController.js')

routerCarrito.get('/carrito', mainCarrito.carrito)

module.exports = routerCarrito;