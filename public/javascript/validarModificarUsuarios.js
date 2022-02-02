
    window.addEventListener('load', function() {
    
        let  formulario = document.querySelector("form");
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();
            let error = [];
           
           let errores = document.querySelector('div.errores ul');
           for(let i = 0; i<error.length; i++){
               errores.innerHTML += '<li>' + error[i] + '</li>'
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
       
        
        let contraseña = document.querySelector(".pass")
        contraseña.addEventListener('onchange', function(){
            if (contraseña.value.length==0 ){
             alert("Debe ingresar la contraseña")
        // contraseña.focus()
        // return 0;
        }
            else if(contraseña.value.length<8){
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
           
        let id_perfil = document.querySelector(".perfil")
            id_perfil.addEventListener('focusout', function(){
       /* let perfiles =(/^comprador|vendedor|.administrador^/i)*/
       /* let perfilesValidos = perfiles.text(id_perfil)*/
             if (perfilesValidos ){
                alert("Perfil valido")
           
            } else { alert("Debe seleccionar alguna opcion")      
            }
        });
           

    

})
    