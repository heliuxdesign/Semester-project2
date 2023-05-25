import displayMessage from "../components/messages.js";
import { getToken } from "./storage.js";
import { baseUrl } from "../settings/api.js";
import createMenu from "../components/createMenu.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const message = document.querySelector(".message-container");
const featured = document.querySelector(".checkboxFeatured");

form.addEventListener("submit", submitForm);

async function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const file = image.files[0];

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0)  {
        return displayMessage("warning", "Please supply proper value", ".message-container");
    }
    
    if (image.files.length === 0) {
		return displayMessage("warning", "Select an image", ".message-container");
	}

    const url = baseUrl + "/products";

    const data = JSON.stringify({
        title: titleValue, 
        description: descriptionValue, 
        featured: featured.checked, 
        price: priceValue
    });

    const formData = new FormData();
    formData.append("files.image", file, file.name);
    formData.append("data", data);

    const token = getToken();

    const options = {
        method: "POST",
        body: formData, 
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        
        if (json.created_at) {
            alert("Product succesfully created");
            form.reset();
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }

    } catch (error) {
        console.log(error);
        displayMessage("error " + error,
                     "Failed to connect " + error,
                     ".message-container");    
    }
}
