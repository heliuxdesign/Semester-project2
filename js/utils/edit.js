import displayMessage from "../components/messages.js";
import { getToken } from "./storage.js";
import { baseUrl } from "../settings/api.js";
import createMenu from "../components/createMenu.js";
import deleteButton from "../components/products/deleteButton.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productsUrl = baseUrl + "/products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");
const featured = document.querySelector(".checkboxFeatured");

(async function() {
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        title.value = json.title;
        description.value = json.description;
        price.value = json.price;
        idInput.value = json.id;
        featured.checked = json.featured;

        deleteButton(json.id);

    } catch (error) {
        displayMessage("error " + error,
                       "Failed to connect " + error,
                       ".message-container"); 
    }
    finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = parseFloat(price.value);
    const idValue = idInput.value;

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0)  {
        return displayMessage("warning", "Please supply proper value", ".message-container");
    }

    updateProduct(titleValue, descriptionValue, priceValue, idValue);

}

async function updateProduct(title, description, price, id) {

    const url = baseUrl + "/products/" + id;
    const data = JSON.stringify({
        title: title, 
        description: description, 
        price: price,
        featured: featured.checked
    });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        
        if (json.updated_at) {
            displayMessage("success", "Product succesfully updated", ".message-container");
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        displayMessage("error " + error,
                    "Failed to connect " + error,
                    ".message-container");   
    }
}

