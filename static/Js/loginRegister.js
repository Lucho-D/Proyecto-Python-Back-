const btnSingIn = document.getElementById("sign-in"),
      btnSingUp = document.getElementById("sign-up"), 
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");



btnSingIn.addEventListener("click", e => {
      containerFormRegister.classList.add("hide");
      containerFormLogin.classList.remove("hide")
})

btnSingUp.addEventListener("click", e => {
      containerFormLogin.classList.add("hide");
      containerFormRegister.classList.remove("hide")
})