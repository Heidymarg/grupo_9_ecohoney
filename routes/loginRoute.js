const express = require('express');

const routerLogin = express.Router();
const mainLogin = require('../controllers/loginController.js')

routerLogin.get('/login', mainLogin.login)

module.exports = routerLogin;