const path = require('path');

const userController = {
    login:(req,res) => { 
        res.render('login') 
    },  
    registro:(req,res) => { 
        res.render('registro')
    },
};
module.exports = userController;
