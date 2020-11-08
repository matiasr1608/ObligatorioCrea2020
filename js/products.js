const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_SELL = "Cant.";
var arraySearch = [];
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var searchInput = "";
var display = "grid";

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SELL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array2) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array2.length; i++) {
        let product = array2[i];
        if (display == "list") {
            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

                htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + " - U$S " + product.cost + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
            }
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
            document.getElementById("cat-list-container2").innerHTML = "";


        }
        if (display == "grid") {
            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

                htmlContentToAppend += `
                <div class="col mb-4">
                <a href="product-info.html"  class="list-group-item-action" >
                    <div class="card h-100 shadow-sm " >
                          <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                            <div class="card-body">
                                <h5 class="card-title">`+ product.name + " - U$S " + product.cost + `</h5>
                                <p class="card-text">` + product.description + `</p>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-outline-dark btn-sm"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                                <circle cx="8" cy="4.5" r="1"/>
                                </svg>
                                </button>
                            <small class="text-muted float-right">`+ product.soldCount + ` vendidos </small>
                             </div>
                         </div>
                         </a>
                    </div>
            `
            }
            document.getElementById("cat-list-container2").innerHTML = htmlContentToAppend;
            document.getElementById("cat-list-container").innerHTML = "";

        }


    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data
            arraySearch = currentProductsArray
            sortProducts(ORDER_DESC_BY_COST, currentProductsArray)
            showProductsList(currentProductsArray)
        }
    });
    document.getElementById("showGrid").onclick = function () {
        display = "grid"
        showProductsList(currentProductsArray)

    }
    document.getElementById("showList").onclick = function () {
        display = "list"
        showProductsList(currentProductsArray)
    }

    document.getElementById("sort$Desc").addEventListener("click", function () {
        arraySearch = sortProducts(ORDER_DESC_BY_COST, arraySearch);
        showProductsList(arraySearch);
    });

    document.getElementById("sort$Asc").addEventListener("click", function () {
        arraySearch = sortProducts(ORDER_ASC_BY_COST, arraySearch)
        showProductsList(arraySearch)
    });

    document.getElementById("sortBySell").addEventListener("click", function () {
        arraySearch = sortProducts(ORDER_BY_PROD_SELL, arraySearch)
        showProductsList(arraySearch)
    });

    function eraseRange() {
        document.getElementById("rangeFilterCountMinProd").value = "";
        document.getElementById("rangeFilterCountMaxProd").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(arraySearch);
    }
    document.getElementById("clearRangeFilterProd").addEventListener("click", function () { eraseRange(); });

    document.getElementById("rangeFilterCountProd").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMinProd").value;
        maxCount = document.getElementById("rangeFilterCountMaxProd").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList(arraySearch);
    });




    let searchBar = document.getElementById('search');

    searchBar.addEventListener('keyup', (event) => {

        searchInput = searchBar.value.toLowerCase()

        arraySearch = currentProductsArray.filter(word => word.name.toLowerCase().includes(searchInput))

        if (arraySearch.length === 0) {
            arraySearch = currentProductsArray
            showProductsList(arraySearch)
            searchBar.classList.add('is-invalid');

        } else {
            showProductsList(arraySearch)
            searchBar.classList.remove('is-invalid');

        }
    });

    // searchBar.addEventListener('search', (event) => {
    //     arraySearch = currentProductsArray;
    //     eraseRange();
    //     showProductsList(arraySearch);
    // });



});