const { response } = require('express');
const { json } = require('express/lib/response');
const db = require('../../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;

const lineasApiController = {


cantLineas: (req, res) => {

    db.lineas.findAll()
        .then(function (lineas) {
        
            let apiResponse= {
                meta: {
                    status: 200,
                    url:"/api/products/cantLineas",
                    total: lineas.length
                },
                data: lineas
            }
            res.json(apiResponse)
        })
        .catch(function(error){
            res.json({status:500}).json(error)

        })
    }
}


module.exports = lineasApiController;
