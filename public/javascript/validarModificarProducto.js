window.addEventListener('load', function(){
    let formulario = document.querySelector("form");
    formulario.addEventListener("submit", function(e){
      e.preventDefault();
      let error = [];
  
      let errores =document.querySelector("div.errores.ul");
      for(let i = 0; i<error.length; i++){
        errores.innerHTML += "<li>" + error [i] + " </li>"
      }
    });
            let codigo = document.querySelector(".codigo")
            codigo.addEventListener('blur', function(){
              if (codigo.value.length==0){
                  alert("El campo de codigo tiene que estar completo");
          
              }else if (codigo.value.length<2){
                  alert(" El campo de codigo debe tener al menos 2 caracteres");
              }
  
          });     let nombre = document.querySelector(".nombre")
            nombre.addEventListener('blur', function(){
              if (nombre.value.length==0){
                  alert("El campo de nombre tiene que estar completo");
          
              }else if (nombre.value.length<2){
                  alert(" El campo de nombre debe tener al menos 5 caracteres");
              }
  
          });
             let descripcion = document.querySelector(".descripcion")
        descripcion.addEventListener('focus', function(){
          if (descripcion.value.length==0){
              alert("El campo de descripcion tiene que estar completo");
      
          }else if (descripcion.value.length<20){
              alert(" El campo de descripcion debe tener al menos 20 caracteres");
          }

      })

          let precio = document.querySelector(".precio")
          precio.addEventListener('blur', function(){
            if (precio.value.length==0){
                alert("El campo de precio tiene que estar completo");
        
            }else if (precio.value.length<2){
                alert(" El campo de precio debe tener al menos 2 caracteres");
            }
        });
          
        let bonif = document.querySelector(".bonif")
        precio.addEventListener('blur', function(){
          if (bonif.value.length==0){
              alert("El campo de bonif tiene que estar completo");
      
          }else if (bonif.value.length<2){
              alert(" El campo de bonif debe tener al menos 2 caracteres");
          }
      });
       
      let cantidad = document.querySelector(".cantidad")
      cantidad.addEventListener('blur', function(){
        if (cantidad.value.length==0){
            alert("El campo de cantidad tiene que estar completo");
    
        }else if (cantidad.value.length<2){
            alert(" El campo de cantidad debe tener al menos 1 caracter");
        }
    });   

    let foto= document.querySelector(".foto")
    foto.addEventListener("blur", function() {
   let formatoValido= (/^.jpg|.jpeg|.png^/i)
   let imagesCorrectas = formatoValido.test(foto);
        if(imagesCorrectas){
         alert('La foto es valida');
       }else{ alert('La foto no es valida');}    
           
       });


 })               
  
  
  
  
  