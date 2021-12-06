function validacionDeInvitados(req, res, next){

   if(req.session.usuarioLogueado == undefined){
      next();
   } else {
      res.send('Acceso sólo a usuarios no logueados');
   }
 } 

module.exports = validacionDeInvitados;