const db = require('../../database/models');
const sequelize = db.sequelize;

const usersApiController = {
   
    listar:(req,res)=>{
        db.usuarios.findAll()
        //include:['perfiles']
        .then(usuarios=>{
            let respuesta = {
                meta: {
                    status: 200,
                    total: usuarios.length,
                    url: "/api/users" 
                },
                data: usuarios.map(users => {
                    return{
                        usuarios:users.usuario,
                            email: users.email,
                            id_perfil: users.id_perfil,
                            id_intereses: users.id_intereses,
                            foto: users.foto,
                            
                    }
                })
            }
            res.json(respuesta)
        })
    },
    detalle:(req, res) => {
        db.usuarios.findByPk(req.params.id)
        .then(usuario=>{
            let respuesta = {
                meta: {
                    status: 200,
                    //total: usuarios.length,
                    url: "/api/users/:id/" ,
                },
                data:{
                    
                 usuario
                         
                    
                }    
            }
            console.log(usuario)
            res.json(respuesta)
        })
        .catch(error=> console.error(error))
    }

}



/* faltaria el detalle de usuario */

module.exports = usersApiController;