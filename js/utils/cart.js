import { getExistingCartProducts } from "./productFunctions.js";

function displayCart() {
    const products = getExistingCartProducts();

    const cartContainer = document.querySelector(".cart-details");
    const price = document.querySelector(".price");

    if(products.length === 0) {
        cartContainer.innerHTML = "No products!";
    }

    products.forEach((details) => {
        cartContainer.innerHTML += `<div class="cartItem">` +
                                    `<img src=${details.img} alt="${details.img.alternativeText}" />` +
                                    `<h3>${details.title}</h3>` +
                                    `<p>Price: ${details.price}</p>` +
                                    `<button class="btnYellow"><a href="details.html?id=${details.id}" class="detailBtn">View details</a></button>` +
                                    `</div>`;                         
    });

    price.innerHTML += `<div class="middle"><p>Total price: ${totalPrice(products)}</p></div>`;
}

function totalPrice(products) {
    let totalPrice = 0;
    for(const product of products) {
        totalPrice += parseFloat(product.price);
    }
    return totalPrice;
}
displayCart();