const { response } = require('express');
const { json } = require('express/lib/response');
const { Promise } = require('sequelize');
const db = require('../../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;

var arrayLineas = [];
var totalLineas = 0;
var countByIdLineas =[];

const productsApiController = {
   
    listar:(req,res)=>{
        
        db.lineas.findAll()
        .then( lineas=>{
            arrayLineas = [];
            totalLineas = lineas.length;
            for (let i = 0; (lineas.length - i) > 0; i++) {
                arrayLineas.push( lineas[i].nombre )
            }
            return arrayLineas;
        });

        let products = db.productos.findAll({ include:['lineas'] })     
        .then( products => {
            /*
            let cuidadoPersonal = products.filter(products => products.id_lineas == 1)
            let hogar = products.filter(products => products.id_lineas== 2)
            let abejas = products.filter(products => products.id_lineas == 3)
            */

            countByIdLineas =[];
            arrayLineas.forEach( (item,i) => 
                countByIdLineas.push( [item, products.filter(products => products.id_lineas == i).length] )
            );
                                    
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/products",
                    lineas: totalLineas,
                    lineasNombre: arrayLineas,
                    countByIdLineas: countByIdLineas,
                        /*[
                            {cuidadoPersonal:cuidadoPersonal.length},
                            {hogar: hogar.length},
                            {abejas: abejas.length}
                        ],*/
                },
                data: products.map(product => {
                    return{
                        idPrd: product.idPrd,
                        nombre: product.nombre,
				        codigo: product.codigo,
				        descripcion : product.descripcion,
				        lineas: product.lineas.nombre,// relación uno a muchos
				        precio : product.precio,
				        bonif: product.bonif,
				        foto:   product.foto,
				        cantidad: product.cantidad,   
                        detalle: "/api/products/" + product.idPrd, 
                    }
               })
            }
            res.json(respuesta)

        })    
        .catch(error=> console.error(error))
     
    },

    detalle:(req,res)=>{
        db.productos.findByPk(req.params.id, {
            include:['lineas']
        })
        .then(producto => {

            let respuesta = {
                meta:{
                    status: 200,
                    url: "/api/products/"                
                },
                data:  { 
                    idPrd: producto.idPrd,
                    nombre: producto.nombre,
				    codigo: producto.codigo,
				    descripcion: producto.descripcion,
                    lineas: producto.lineas.nombre,// relación uno a muchos
				    precio : producto.precio,
				    bonif: producto.bonif,
				    foto:  producto.foto,
				    cantidad: producto.cantidad,                       
                }
           }
            console.log(respuesta)
           res.json(respuesta)
        })
        .catch(error=> console.error(error))
        //.catch(function(error){
            //res.json({status:800})
       // })
        
    },


    ultimo: (req, res) => {
       //db.lineas.findAll({order:[["idPrd"]], limit:1})

       db.productos.findAll({order:[["idPrd", "DESC"]], limit:1})
       .then(function (product) {
           
           product[0].setDataValue("endpoint", "/api/products/lastProducts/" + product.length)

            let apiResponse= {
               meta: {
                    status: 200,
                    url:"/api/products/lastProducts",
                    total: product.length
                },
                data: product
            }
            res.json(apiResponse)
        })
        .catch(function(error){
           res.json({status:500}).json(error)

        })
    }
}

module.exports = productsApiController;