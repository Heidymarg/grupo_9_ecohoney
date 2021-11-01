const express = require('express');

const router = express.Router();
const loginController = require('../controllers/loginController.js');

router.get('/views/users/login.ejs', loginController.login);

module.exports = router;


