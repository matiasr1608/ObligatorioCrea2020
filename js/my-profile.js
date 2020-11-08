//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const saveButton = document.getElementById("saveButton");
    const firstname = document.getElementById("inputNombre");
    const lastName = document.getElementById("inputApellido");
    const email = document.getElementById("inputEmail");
    const phone = document.getElementById("inputTelefono");
    const profileImage = document.getElementById("profileImage");

    const savedprofile = JSON.parse(localStorage.getItem("profile"));
    var imageText = "";

    if (savedprofile != null) {
        mostrardatos(savedprofile);
    } else {
        email.value = localStorage.getItem("email");
        profileImage.setAttribute("src", "/img/person_1.png");     
    }

   

    saveButton.onclick = function () {
        editardatos();
    }

    function editardatos() {
        firstname.classList.remove('is-invalid');
        lastName.classList.remove('is-invalid');
        email.classList.remove('is-invalid');
        phone.classList.remove('is-invalid');

        var alertContenido = document.getElementById("alertProfile");
        if (document.getElementById("profileForm").checkValidity() === true) {

            var profile = {
                "name": firstname.value,
                "lastname": lastName.value,
                "email": email.value,
                "phone": phone.value,
                "photo": imageText,
            };
            localStorage.setItem("profile", JSON.stringify(profile));
            username.innerText = firstname.value;
            // profileImage.setAttribute("src", imageText)
            lastName.classList.add('is-valid');
            firstname.classList.add('is-valid');
            email.classList.add('is-valid');
            phone.classList.add('is-valid');
            
            // alertContenido.innerHTML = `<div class="alert alert-success text-center" role="alert">
            // Los datos se han guardado correctamente.
            //  </div>`;

            // setTimeout(function () {
            //     alertContenido.innerHTML = ""
            // }, 4000);
        } else {
            if(!firstname.checkValidity()){firstname.classList.add('is-invalid'); }
            if(!lastName.checkValidity()){lastName.classList.add('is-invalid'); }
            if(!email.checkValidity()){email.classList.add('is-invalid'); }
            if(!phone.checkValidity()){phone.classList.add('is-invalid'); }

        //     alertContenido.innerHTML = `<div class="alert alert-danger text-center" role="alert">
        //  ¡Ingrese todos los campos!
        //   </div>`

        //     setTimeout(function () {
        //         alertContenido.innerHTML = ""
        //     }, 4000);
        }
    }

    function mostrardatos(datos) {
        firstname.value = datos.name;
        lastName.value = datos.lastname;
        email.value = datos.email;
        phone.value = datos.phone;
        if(savedprofile.photo ==""){
            profileImage.setAttribute("src", "/img/person_1.png");
        }else{
            profileImage.setAttribute("src", datos.photo);
        }
    }



    document.getElementById('inputImage').addEventListener('change', function (event) {
        var myCanvas = document.createElement('CANVAS');
        var ctx = myCanvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
            myCanvas.width = img.width;
            myCanvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            imageText = myCanvas.toDataURL('image/jpeg');
            profileImage.setAttribute("src", imageText);

        };
        img.src = URL.createObjectURL(event.target.files[0]);
    });

   

});