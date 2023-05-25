import displayError from "../components/messages.js";
import { baseUrl } from "../settings/api.js";
import {getUsername} from "./storage.js";

function createProductDiv(product)
{
    let page = "details";
    const username = getUsername();
    if (username != null) {
      page = "edit";
    }

    return  `<div class="col-sm-3">` +
            `   <div class="card h-100">`  +
            `     <img src=${baseUrl}${product.image.url} alt="${product.image.alternativeText}" class="card-img-top"></>` +
            `     <div class="card-body">` +
            `        <h4 class="card-title">${product.title}</h4>` +
            `        <h5>Price: ${product.price}</h5>` +
            `        <button class="btnYellow"><a href="${page}.html?id=${product.id}" class="detailBtn">View details</a></button>` + 
            `     </div>` +
            `   </div>` +
            `</div>`;
}

function displayProducts(products) {
    const noProductsContainer = document.querySelector(".no-results");
    noProductsContainer.innerHTML = "";

    const productsDiv = document.querySelector(".row ");
    productsDiv.innerHTML = "";
    products.forEach(product => productsDiv.innerHTML += createProductDiv(product));

    if(products.length === 0) {
        noProductsContainer.innerHTML = "No products found";
    }
}

async function callApi () {   
    try {
        const productsUrl = baseUrl + "/products";
        const items = await fetch(productsUrl);
        const json = await items.json();

        displayProducts(json);
        addSearchOnTitle(json);
     
    }
    catch (error) {
        displayError("error " + error,
                     "Failed to connect " + error,
                     ".message-container");          
    }

}

function addSearchOnTitle(json) {
    const searchButton = document.querySelector(".btnsearch");
    const searchInput = document.querySelector(".search");

    searchButton.onclick = () => {
        const searchTerm = searchInput.value.toLowerCase();
        displayProducts(json.filter(product => product.title.toLowerCase().startsWith(searchTerm)));
        return false;
    };
}

callApi();

