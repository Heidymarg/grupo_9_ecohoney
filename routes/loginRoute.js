const express = require('express');

const router = express.Router();
const loginController = require('../controllers/loginController.js');

<<<<<<< HEAD
router.get('/login', loginController.login);
=======
router.get('/views/users/login.ejs', loginController.login);
>>>>>>> be92a32cabc56f7e475d3d71f733bb3471c1a832

module.exports = router;


