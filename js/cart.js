//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var subtotal = 0
var unidades = 0
var valorProducto = 0
var porcentaje = 0;
var subtotalEnPantalla= false
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProductsArray = resultObj.data.articles
            showCartProducts(cartProductsArray);
            document.getElementById("buttonTitle").innerHTML = "Seleccione el tipo de envío"
        }

    });



    document.getElementById("envioExpress").onclick = function (e) {
        subtotalEnPantalla = true;
        porcentaje = 7
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio Express (5-8 días)"
    }
    document.getElementById("envioPremium").onclick = function (e) {
        porcentaje = 15
        subtotalEnPantalla = true;

        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio Premium  (2-5 días)"
    }
    document.getElementById("envioStandard").onclick = function (e) {
        subtotalEnPantalla = true;

        porcentaje = 5
        calcularCostoDeEnvio(porcentaje)
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
    
    function calcularCostoDeEnvio(porcentaje) {
        

        let totalProductos = document.getElementsByClassName("subtotal");
        let subtotalFinal = 0;
        for (let i = 0; i < totalProductos.length; i++) {
            const element = totalProductos[i];
            subtotalFinal += parseInt(element.textContent, 10);
        }
        let totalEnvio = (subtotalFinal * porcentaje) / 100
        if (subtotalEnPantalla){document.getElementById("totalContainer").innerHTML = `
        <p>Subtotal: $<span id="subtotalFinal"></span></p> 
        <p>Costo de envío ( <span id="porcentaje"></span>%): $<span id="costoEnvio"></span></p> 
        <hr>
        <p style="color:red">Total: $<span id="total"></span></p>`
        document.getElementById("total").innerHTML = subtotalFinal + totalEnvio;
        document.getElementById("costoEnvio").innerHTML = totalEnvio;
        document.getElementById("porcentaje").innerHTML = porcentaje;
        document.getElementById("subtotalFinal").innerHTML = subtotalFinal;
        }
    }


    function showCartProducts(array) {
        let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let product = array[i];
            // valorProducto = product.unitCost
            // unidades = product.count
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
        for (let i = 0; i < array.length; i++) {
            let product = array[i];
            armarsubtotal(product.count, "subtotal" + i, product);
        }

        let cantidades = document.getElementsByClassName("quantity");
        for (let i = 0; i < cantidades.length; i++) {
            let product = array[i];
            const element = cantidades[i];
            element.onchange = function (e) {
                armarsubtotal(e.target.value, "subtotal" + i, product)
                calcularCostoDeEnvio(porcentaje)
            }
        }


    }

}
);

// {/* <small class="text-muted">` +product.count + ` unidades</small> */}
