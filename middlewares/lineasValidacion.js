function lineasValidacion(req, res, next){
    /*if( !req.session.lineasAgregar ){
       res.redirect('/linea/agregar');
       
    } else {
       res.render('lineasAgregar', {'resultadoValidaciones': eslalinea  } );
    }*/
    next();
  }
     
 module.exports = lineasValidacion;
 