import displayError from "../components/messages.js";
import { saveToken, saveUser } from "./storage.js";
import { baseUrl } from "../settings/api.js";
import createMenu from "../components/createMenu.js";

const form = document.querySelector("form");
const username = document.querySelector("#userName");
const password = document.querySelector("#password");
const messageContainer = document.querySelector(".message-container-form");

createMenu();

form.addEventListener("submit", loginForm);

function loginForm(event) {
    event.preventDefault();

    messageContainer.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0) {
        displayError("warning", "Invalid values", ".message-container-form");
    }

    loginToPage(usernameValue, passwordValue);

}

async function loginToPage(username, password) {

    const url = baseUrl + "/auth/local";

    const data = JSON.stringify({ identifier: username, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.user) {
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/";
        }
        
        if(json.error) {
            displayError("warning", 
                           "Login is not succesful: invalid login details", 
                           ".message-container-form"); 
        }
    }
    catch(error) {
        displayError("error",
                       "Failed to connect",
                       ".message-container-form");
    }
    
}