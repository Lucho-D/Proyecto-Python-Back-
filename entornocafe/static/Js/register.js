const formRegister = document.querySelector(".form-register");
const inputUser= document.querySelector(".form-register input[type='text']");
const inputEmail= document.querySelector(".form-register input[type='email']");
const inputPass= document.querySelector(".form-register input[type='password']");
const alertaError = document.querySelector(".alerta-error");
const alertaExito = document.querySelector(".alerta-exito");



const userNameRegex = /^[a-zA-Z0-9]{4,16}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^.{8,12}$/;



const estadoValidacionCampos = {
    userName: false,
    userEmail: false,
    userPassword: false,
}

document.addEventListener("DOMContentLoaded", () =>{
    formRegister.addEventListener("submit", e =>{
        e.preventDefault();
        enviarFormulario();
    });
    inputUser.addEventListener("input",() => {
        validarCampo(userNameRegex,inputUser,"El usuario debe tener de 6 a 16 caracteres y solo puede llevar letras y números");
    })
    inputEmail.addEventListener("input",() => {
        validarCampo(emailRegex,inputEmail,"Ingresa un correo electrónico con formato válido");
    })
    inputPass.addEventListener("input",() => {
        validarCampo(passwordRegex,inputPass,"La contraseña debe tener 8 a 12 digitos")
    })

})
function validarCampo(regularExpresion,campo,mensaje){
    const  validarCampo= regularExpresion.test(campo.value);
    if(validarCampo){
        eliminarAlerta(campo.parentElement.parentElement)
        estadoValidacionCampos[campo.name] = true;
        console.log( estadoValidacionCampos)
        campo.parentElement.classList.remove("error");
        }else{
            estadoValidacionCampos[campo.name] = false;
            mostrarAlerta(campo.parentElement.parentElement,mensaje)
            campo.parentElement.classList.add("error");
        }
}
function mostrarAlerta(referencia,mensaje) {
    eliminarAlerta(referencia)
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta");
    alertaDiv.textContent= mensaje;
    referencia.appendChild(alertaDiv)
}
function eliminarAlerta(referencia){
    const alerta = referencia.querySelector(".alerta");
    
   if (alerta) {
    alerta.remove()
   }
}




function enviarFormulario(){
    //validamos el envio del formulario
    if (estadoValidacionCampos.userName && estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword){
        alertaExito.classList.add("alertaExito");
        alertaError.classList.remove("alertaError");
        formRegister.reset()
        setTimeout(() =>{
            alertaExito.classList.remove("alertaExito");
        }, 3000);
    } else{
        alertaExito.classList.remove("alertaExito");
        alertaError.classList.add("alertaError");
        setTimeout(() => {
            alertaError.classList.remove("alertaError");
        },3000)
        
    }
}