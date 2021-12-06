function validacionDeUsuario(req, res, next){
   if(req.session.usuarioLogueado){
      next();
   } else {
      //res.redirect('index');
   }

 }
    
module.exports = validacionDeUsuario;



