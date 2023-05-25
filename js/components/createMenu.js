import { getUsername } from "../utils/storage.js";
import logoutButton from "./buttons.js";

export default function createMenu() {
  const { pathname } = document.location;

  const username = getUsername();
   
  let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

  if(username) {
    authLink = `<a href="add.html" class="${pathname === "/add.html" ? "active" : ""}">Add Product</a>
                <button class="btnRed" id="logout">Logout ${username}</button>`;
  }
       
  const container = document.querySelector(".menu-container");

  container.innerHTML = `<div class="menu">
                            <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
                              ${authLink}
                          </div>`;
                           
  logoutButton();
}