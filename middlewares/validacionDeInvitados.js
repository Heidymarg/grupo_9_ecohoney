function validacionDeInvitados(req, res, next){
   if(req.session.usuarioLogueado == undefined){
      // no encuentra la ruta res.render('/');
   } else {
      next();
   }
 } 

module.exports = validacionDeInvitados;