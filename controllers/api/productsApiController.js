const { response } = require('express');
const { json } = require('express/lib/response');
const db = require('../../database/models');
const sequelize = db.sequelize;
const op = db.Sequelize.Op;

const productsApiController = {
   
    listar:(req,res)=>{
        // db.productos.findAll()
        //   .then(products=> {
        
        //      const response = {
        //         meta:{
        //            status:200,
        //            total: products.length,
        //            url:'api/productos'
        //         },
        //         data:products
        //      }
        //      res.json(response) 
        //     })  
        //     .catch(error=> console.log(error))
         
        
         
   
         db.productos.findAll({
            include:['lineas']
       })
     // })
        .then(lineas=>{console.log(lineas)
            let arrayLineas = []
            for(let i=0; i<lineas.length ; i++){
               arrayLineas.push({
               nombre: lineas[i].dataValues.nombre,
                })
            }
            let cuidadoPersonal = lineas.filter(linea => linea.id_lineas == 1)
            let hogar = lineas.filter(linea => linea.id_lineas== 2)
            let abejas = lineas.filter(linea => linea.id_lineas == 3)
            let respuesta = {
                meta: {
                   status: 200,
                   total: lineas.length,
                   url: "/api/products",
                    //lineas: lineas.length,
                   lineasNombre: arrayLineas,
                   countByIdLineas: [
                       {cuidadoPersonal:cuidadoPersonal.length},
                       {hogar: hogar.length},
                       {abejas: abejas.length}
                   ]
                },
                data: lineas.map(product => {
                    return{
                        idPrd: product.idPrd,
                        nombre: product.nombre,
				        codigo: product.codigo,
				        descripcion : product.descripcion,
				        id_lineas : product.id_lineas,
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
        .then(product=>{
            let respuesta = {
                meta:{
                    status: 200,
                    url: "/api/products/"                
                },
                data:  { 
                    idPrd: product.idPrd,
                    nombre: product.nombre,
				    codigo: product.codigo,
				    descripcion: product.descripcion,
				    id_lineas : product.id_lineas,
				    precio : product.precio,
				    bonif: product.bonif,
				    foto:  product.foto,
				    cantidad: product.cantidad,                       
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

       db.productos.findAll({order:[["idPrd"]], limit:1})
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