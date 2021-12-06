function validacionDeUsuario(req, res, next){
   if(req.session.usuarioLogueado){
      // no encuentra la ruta res.render('/');
   } else {
      next();
   }
 }
    
module.exports = validacionDeUsuario;



