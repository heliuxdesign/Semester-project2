import displayMessage from "../components/messages.js";
import { getExistingCartProducts } from "./productFunctions.js";
import { baseUrl } from "../settings/api.js";

const productContainer = document.querySelector(".product-details");
const everyProduct = getExistingCartProducts();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const productsUrl = baseUrl + "/products/" + id;

async function callApi () {   
    try {
        const products = await fetch(productsUrl);
        const details = await products.json();
        createDetailHtml(details);
    }
    catch (error) {
        displayMessage("error " + error,
                     "Failed to connect " + error,
                     ".message-container");          
    }
} 

function createDetailHtml(details) {
    console.log(details);
    const isProductInCart = everyProduct.find(function(p) {
        return details.id === parseInt(p.id);
    });

    let productButtonText = isProductInCart ?  "Remove from cart" : "Add to cart";
    productContainer.innerHTML = `<h1>${details.title}</h1>` +
                                 `<img src=${baseUrl}${details.image.url} alt="${details.image.alternativeText}"></>` +
                                 `<h2>Price: ${details.price}</h2>` +
                                 `<p>${details.description}</p>` +
                                 `<button class="cartBtn" 
                                          data-id="${details.id}" 
                                          data-title="${details.title}" 
                                          data-price="${details.price}"
                                          data-img="${baseUrl}${details.image.url}">${productButtonText}</button>`;

    const addCart = document.querySelector(".cartBtn");

    addCart.addEventListener("click", addToCart);

    function addToCart(e) {
        const buttonText = e.target;
                                     
        const id = buttonText.dataset.id;
        const title = buttonText.dataset.title;
        const price = buttonText.dataset.price;
        const img = buttonText.dataset.img;

        const currentCartProducts = getExistingCartProducts();

        const productExists = currentCartProducts.find(function(seedProduct) {
             return seedProduct.id === id;
        });

        if(productExists === undefined) {
            const product = { 
                id: id, 
                title: title, 
                price:price, 
                img: img
            };
            currentCartProducts.push(product);
            saveCartProducts(currentCartProducts);
        }
        else {
            const newSeedProducts = currentCartProducts.filter((seedProduct) => seedProduct.id !== id);
            saveCartProducts(newSeedProducts);
        }

        if(buttonText.innerHTML == "Add to cart") {
            buttonText.innerHTML = "Remove from cart";
        }
        else {
            buttonText.innerHTML = "Add to cart";
        }
                                    
    }
                                 
    function saveCartProducts(cartProducts) {
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
}
callApi();












