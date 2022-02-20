const db = require('../../database/models');
const sequelize = db.sequelize;

const usersApiController = {
   
    listar:(req,res)=>{
        db.usuarios.findAll({include:['intereses']}) // sequelize no reconose include ['perfiles']
        .then(usuarios=>{
            let respuesta = {
                meta: {
                    status: 200,
                    total: usuarios.length,
                    url: "/api/users" 
                },
                data: usuarios.map(usuario => {
                    return{
                        id: usuario.idUsr,
                        usuario: usuario.usuario,
                        email: usuario.email,
                        perfil: usuario.id_perfil, //perfil: usuario.perfiles.nombre, sequelize no reconoce la relación co perfiles
                        intereses: usuario.intereses.nombre,
                        foto: usuario.foto,
                        detalle: "/api/users/" + usuario.idUsr    
                    }
                })
            }
            res.json(respuesta)
        })
    },
    
    detalle:(req, res) => {
        db.usuarios.findByPk(req.params.id, {
            include:['intereses']
        })
        .then(usuario=>{
            let respuesta = {
                meta: {
                    status: 200,
                    //total: usuarios.length,
                    url: "/api/users/:id/" ,
                },
                data:{
                        id: usuario.idUsr,
                        nombre: usuario.usuario,
                        email: usuario.email,
                        perfil: usuario.id_perfil,
                        intereses: usuario.intereses.nombre,
                        avatar: usuario.foto
                }    
            }
            console.log(usuario)
            res.json(respuesta)
        })
        .catch(error=> console.error(error))
    },

    ultimo: (req, res) => {

        //db.usuarios.findAll({order:[["idUsr", "DESC"]], limit:1, include:['interesesdeusuarios']})
        //db.usuarios.findAll({order:[["idUsr", "DESC"]], limit:1, include:['perfiles']})
        db.usuarios.findAll({order:[["idUsr", "DESC"]], limit:1})
        .then(usuario => {

            let apiResponse= {
                meta: {
                    status: 200,
                    url:"/api/usuarios/lastUser",
                    total: usuario.length
                },

                data: {
                    id: usuario[0].dataValues.idUsr,
                    usuario: usuario[0].dataValues.usuario,
                    email: usuario[0].dataValues.email,
                    //perfil: usuario[0].dataValues.perfiles.nombre, //sequelize no reconoce la relación co perfiles
                    //intereses: usuario[0].dataValues.interesesdeusuarios.nombre,
                    perfil: usuario[0].dataValues.id_perfil,
                    intereses: usuario[0].dataValues.id_intereses,
                    foto: usuario[0].dataValues.foto,
                    detalle: "/api/users/" + usuario[0].dataValues.idUsr   
                }
            }
            res.json(apiResponse)
        })
        .catch(error=> console.error(error))
    }

}

module.exports = usersApiController;