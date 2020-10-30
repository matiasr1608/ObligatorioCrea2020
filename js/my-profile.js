//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const saveButton = document.getElementById("saveButton")
    const firstname = document.getElementById("inputNombre")
    const lastName = document.getElementById("inputApellido")
    const email = document.getElementById("inputEmail")
    const phone = document.getElementById("inputTelefono")
    const savedprofile = JSON.parse(localStorage.getItem("profile"))

    if (savedprofile != null) {
        mostrardatos(savedprofile)
    } else {
        email.value = localStorage.getItem("email")
    }

    saveButton.onclick = function () {
        editardatos()
    }

    function editardatos() {

        var alertContenido = document.getElementById("alertProfile")
        if (document.getElementById("profileForm").checkValidity() === true) {
            
            var profile = {
                "name": firstname.value,
                "lastname": lastName.value,
                "email": email.value,
                "phone": phone.value,
            }
            localStorage.setItem("profile", JSON.stringify(profile))
            username.innerText = firstname.value

            alertContenido.innerHTML = `<div class="alert alert-success text-center" role="alert">
            Los datos se han guardado correctamente.
             </div>`

            setTimeout(function () {
                alertContenido.innerHTML = ""
            }, 4000);
        } else {
            alertContenido.innerHTML = `<div class="alert alert-danger text-center" role="alert">
         ¡Ingrese todos los campos!
          </div>`

            setTimeout(function () {
                alertContenido.innerHTML = ""
            }, 4000);
        }
    }

    function mostrardatos(datos) {
        firstname.value = datos.name
        lastName.value = datos.lastname
        email.value = datos.email
        phone.value = datos.phone
    }





});