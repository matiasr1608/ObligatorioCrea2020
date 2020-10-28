//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var subtotal = 0
var unidades = 0
var valorProducto = 0
var porcentaje = 0;
var subtotalEnPantalla = false
var cartProductsArray = [];
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProductsArray = resultObj.data.articles
            showCartProducts(cartProductsArray);
            document.getElementById("buttonTitle").innerHTML = "Seleccione el tipo de envío"
        }

    });

    const boton = document.getElementById("nextButton")
    const submitBut = document.getElementById("submitButton")
    const closebut = document.getElementById("closeButton");

    boton.onclick = function (e) {
        document.getElementById("FirstPageModal").style.display = "none";

        boton.style.display = "none"
        if (document.getElementById("radioCard").checked) {
            document.getElementById("cardPayment").style.display = "block";
            submitBut.setAttribute("form", "form2")
            submitBut.style.display = "block"
        }
        if (document.getElementById("radioBank").checked) {
            document.getElementById("bankPayment").style.display = "block";
            closebut.style.display = "block"
        }
    }


    function deletemodalcontent() {
        document.getElementById("cardPayment").style.display = "none";
        document.getElementById("bankPayment").style.display = "none";
        document.getElementById("FirstPageModal").style.display = "block";
        boton.style.display = "block";
        submitBut.style.display = "none";
        closebut.style.display = "none";
        }
    $('#modalID').on('hidden.bs.modal', function (e) {
        deletemodalcontent()
    })



    document.getElementById("envioExpress").onclick = function (e) {
        subtotalEnPantalla = true;
        porcentaje = 7
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio Express (5-8 días)"
        document.getElementById("formEnvio").style.display = "block";

    }
    document.getElementById("envioPremium").onclick = function (e) {
        porcentaje = 15
        subtotalEnPantalla = true;
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio Premium  (2-5 días)"
        document.getElementById("formEnvio").style.display = "block";

    }
    document.getElementById("envioStandard").onclick = function (e) {
        subtotalEnPantalla = true;
        porcentaje = 5
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("formEnvio").style.display = "block";
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio Standard (12 a 15 días)"
    }



    function armarsubtotal(unidades, idsubtotal, cartProduct) {
        valorProducto = cartProduct.unitCost
        if (cartProduct.currency == "USD") {
            subtotal = unidades * valorProducto * 44
        } else {
            subtotal = unidades * valorProducto
        }

        document.getElementById(idsubtotal).innerHTML = subtotal
    }
    document.getElementById("continuar").onclick = function(e){
        e.preventDefault()
        if (document.getElementById("form3").checkValidity() === true){
            document.getElementById("totalContainer").style.display = "block"; 
            document.getElementById("continuar").style.display="none"
        }else{
          var  alertContenido = document.getElementById("alert")
           alertContenido.innerHTML =`<div class="alert alert-danger" role="alert">
         ¡Debe rellenar todos los campos!
          </div>`
          
            setTimeout(function () {
                alertContenido.innerHTML=""
            }, 5000);

        }
        // return false
    }

    function calcularCostoDeEnvio(porcentaje) {
        let totalProductos = document.getElementsByClassName("subtotal");

        let subtotalFinal = 0;
        for (let i = 0; i < totalProductos.length; i++) {
            const element = totalProductos[i];
            subtotalFinal += parseInt(element.textContent, 10);
        }
        let totalEnvio = (subtotalFinal * porcentaje) / 100
        if (subtotalEnPantalla) {
            // document.getElementById("totalContainer").style.display = "block";
            document.getElementById("total").innerHTML = subtotalFinal + totalEnvio;
            document.getElementById("costoEnvio").innerHTML = totalEnvio;
            document.getElementById("porcentaje").innerHTML = porcentaje;
            document.getElementById("subtotalFinal").innerHTML = subtotalFinal;
        }
    }


    function showCartProducts(array) {
        let htmlContentToAppend = "";
        if (array.length == 0) {
            document.getElementById("cartProducts").innerHTML = "No hay productos en el carrito";
            document.getElementById("dropdownMenuButtonShipping").style.display = "none"
            document.getElementById("totalContainer").style.display = "none";

        } else {
            for (let i = 0; i < array.length; i++) {
                let product = array[i];
                htmlContentToAppend += `
            <a  class="list-group-item list-group-item-action" height="150">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.src + `" alt=" " class="img-thumbnail" width="100" height="100">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                           
                        </div>
                    </div>
                    <div class="col">
                        <p>Costo unitario: `+ product.currency + "   " + product.unitCost + ` </p>   
                         <label for="quantity">Cantidad:</label>
                         <input type="number" value="${product.count}" class="quantity"  min="1" max="5">
                    </div>
                    <div class="col-auto">
                    <button name="borrar" id="${i}" type="button" class="close" d aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>  
                      </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-4">
                    <p class="text-right" style="color:#ff9e8f">Subtotal del producto: $  <span class="subtotal" id="subtotal`+ i + `"></span></p> 
                    </div>
                    
                </div>
            </a>
            `
            document.getElementById("cartProducts").innerHTML = htmlContentToAppend;
            }
        }

        for (let i = 0; i < array.length; i++) {
            let product = array[i];
            armarsubtotal(product.count, "subtotal" + i, product);
            calcularCostoDeEnvio(porcentaje)

        }

        let cantidades = document.getElementsByClassName("quantity");
        for (let i = 0; i < cantidades.length; i++) {
            let product = array[i];
            const element = cantidades[i];
            element.onchange = function (e) {
                product.count=e.target.value
                
                armarsubtotal(e.target.value, "subtotal" + i, product)
                calcularCostoDeEnvio(porcentaje)
            }
        }
        let buttonserase = document.getElementsByName("borrar")
        for (let i = 0; i < buttonserase.length; i++) {
            const boton = buttonserase[i];
            boton.onclick = function (e) {
                cartProductsArray.splice(boton.id, 1)
                showCartProducts(cartProductsArray)
            }
        }
    }
}
);

