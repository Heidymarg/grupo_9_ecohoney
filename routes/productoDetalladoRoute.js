const express = require('express');

const routerProductoDetallado = express.Router();
const mainProductoDetallado = require('../controllers/productoDetalladoControler.js');

routerProductoDetallado.get('/detalle', mainProductoDetallado.raiz);

module.exports = routerProductoDetallado;