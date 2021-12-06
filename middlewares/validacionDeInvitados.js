function validacionDeInvitados(req, res, next){

   if(req.session.usuarioLogueado == undefined){
      next();
   } else {
      //res.send('Acceso sólo a usuarios no logueados');
      res.render('profile');
   }
 } 

module.exports = validacionDeInvitados;