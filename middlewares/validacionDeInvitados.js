function validacionDeInvitados(req, res, next){
   if(req.session.usuarioLogueado == undefined){
      next();
   } else {
      req.session.cantLogueos = 1;
   }

 } 

module.exports = validacionDeInvitados;