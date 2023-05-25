import { clearStorage } from "../utils/storage.js";

export function addToggleButtons() {
    const buttons = document.querySelectorAll(".btnsearch");

    buttons.forEach((button) => {
        button.addEventListener("click", toggleClick);
    });
}

export default function logoutButton() {
    const button = document.querySelector("#logout");

    if(button) {
        button.onclick = function() {
            const doLogout = confirm("Are you sure you want to log out?");

            if(doLogout) {
                clearStorage();
                location.href = "/";
            }
        }
    }
}

