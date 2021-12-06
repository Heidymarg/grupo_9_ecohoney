function validacionDeUsuario(req, res, next){
   if( !req.session.usuarioLogueado ){
      res.redirect('/usuarios/login');
      
   } else {
      res.render('indexProtegido', {'usuarioLogueado': esElUsuario,  'listado': listaDeIndex,'listadoOfertas': listaOfertas} );
   }
   next();
 }
    
module.exports = validacionDeUsuario;



