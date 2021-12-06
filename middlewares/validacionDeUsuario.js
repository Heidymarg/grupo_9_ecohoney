function validacionDeUsuario(req, res, next){
   if(req.session.usuarioLogueado != undefined){
      next();
   } else {
      res.send('Acceso sólo a usuarios logueados');
   }
 }
    
module.exports = validacionDeUsuario;



