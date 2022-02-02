
    window.addEventListener('load', function() {
        /*let formulario = document.querySelectorAll('form')[1];*/ /*dice que esta declarado debo revisar*/
        const  formulario = document.querySelector("form");
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();
            let error = [];
           
           let errores = document.querySelector('div.errores ul');
           for(let i = 0; i<error.length; i++){
               errores.innerHTML += '<li>' + error[i] + '</li>'
            }
        });

        let campoNombre = document.querySelector(".nombre")
          campoNombre.addEventListener('focus', function(){
            if (campoNombre.value.length==0){
                alert("El campo de nombre tiene que estar completo");
        
            }else if (campoNombre.value.length<2){
                alert(" El campo de nombre debe tener al menos 2 caracteres");
            }

        });

        let users = document.querySelector(".user")
           users.addEventListener('focus', function(){
        let expRegx= (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
        var usuarios= expRegx.test(users)
            if (usuarios){
                alert("El campo usuarios es correcto");
        
            }else{
                alert(" El campo usuarios no es valido");
                    }

            });

         /*const button = document.querySelector("button").addEventListener = ("click", evalEmail)*/
         let formEmail = document.querySelector(".email")
            formEmail.addEventListener('focus', function(){
              let expReg = (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
              var esValido =  expReg.test(formEmail);
             
              if(esValido ){
                 alert('El correo electronico es valido');
                }else{
                 alert('El correo Electronico no es valido');
             };
         });
         
        let campoFecha = document.querySelector('.birth_date')
                if(campoFecha.value ==""){
                    alert("El campo de fecha debe estar completo")
                };

        let campoDocumento = document.querySelector('.dni')
                if(campoDocumento.value==""){
                    alert("Completar el DNI")
                }
               

        let contraseña = document.querySelector(".pass")
           contraseña.addEventListener('focusout', function(){
           if (contraseña.value.length==0 ){
            alert("Debe ingresar la contraseña")
        // contraseña.focus()
        // return 0;
        } else if(contraseña.value.length<8){
        alert("Debera tener al menos 8 caracteres"  /* + letras mayusculas, minusculas,1 numero +caracter especial*/ )
        //contraseña.focus()
        //return 0;     
        }   
        });
      
        let reingresaContraseña = document.querySelector(".pass_confirm")
         reingresaContraseña.addEventListener('focusout', function(){
          if (reingresaContraseña.value.length==0 ){
            alert("Reingresar la contraseña")
        // contraseña.focus()
        // return 0;
        }
         else if(reingresaContraseña.value.length<8){
         alert("Debera tener al menos 8 caracteres"  /* + letras mayusculas, minusculas,1 numero +caracter especial*/ )
        //contraseña.focus()
        //return 0;     
        }   
        });
          
        let foto= document.querySelector(".foto")
            foto.addEventListener("focus", function() {
        let formatoValido= (/^.jpg|.jpeg|.png^/i)
        let imagesCorrectas = formatoValido.test(foto);
                if(imagesCorrectas){
                alert('La foto es valida');
            }else{ alert('La foto no es valida');}    
            
        });
           

           

    

})
    