function validacionDeInvitados(req, res, next){

   if(req.session.usuarioLogueado == undefined){
      next();
   } else {
      //Acceso sólo a usuarios no logueados
      res.render('/');
   }
 } 

module.exports = validacionDeInvitados;