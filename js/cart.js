//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProductsArray = resultObj.data.articles
            showCartProducts(cartProductsArray);
            document.getElementById("buttonTitle").innerHTML = "Seleccione el tipo de envío"
        }

    });

    var subtotal = 0
    var unidades = 0
    var valorProducto = 0
    var porcentaje = 0;

    function armarsubtotal(unidades, idsubtotal, cartProduct) {
        console.log(cartProduct)
        valorProducto = cartProduct.unitCost
        if (cartProduct.currency == "USD") {
            subtotal = unidades * valorProducto * 44
        } else {
            subtotal = unidades * valorProducto
        }

        document.getElementById(idsubtotal).innerHTML = subtotal
        console.log(subtotal)
    }
    function calcularCostoDeEnvio(porcentaje) {
        document.getElementById("totalContainer").innerHTML =`
        <p>Costo de envío ( <span id="porcentaje"></span>%): $<span id="costoEnvio"></span></p>  
        <p>Total: $<span id="total"></span></p>`
        let total = document.getElementsByClassName("subtotal");
        let total2 = 0;
        for (let i = 0; i < total.length; i++) {
            const element = total[i];
            total2 += parseInt(element.textContent, 10)
        }
        let totalEnvio = (total2 * porcentaje) / 100
        document.getElementById("total").innerHTML = total2 + totalEnvio;
        document.getElementById("costoEnvio").innerHTML = totalEnvio;
        document.getElementById("porcentaje").innerHTML = porcentaje
    }

    document.getElementById("envioMvd").onclick = function (e) {
        porcentaje = 3.5
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio dentro de Montevido"
    }
    document.getElementById("envioInterior").onclick = function (e) {
        porcentaje = 5.5
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado envio al interior"
    }
    document.getElementById("retiroLocal").onclick = function (e) {
        porcentaje = 0
        calcularCostoDeEnvio(porcentaje)
        document.getElementById("buttonTitle").innerHTML = "Has seleccionado retiro en el local"
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
                    <p class="text-right" style="color:red">Subtotal: $  <span class="subtotal" id="subtotal`+ i + `"></span></p> 
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
        console.log(cantidades)
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
