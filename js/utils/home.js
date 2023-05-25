import displayMessage from "../components/messages.js";
import { baseUrl } from "../settings/api.js";
import createMenu from "../components/createMenu.js";

createMenu();

async function callApiHomebanner () {  
    const homeUrl = baseUrl + "/home";
    const heroBanner = document.querySelector(".heroBanner");
    
    try {
        const items = await fetch(homeUrl);
        const json = await items.json();

        heroBanner.innerHTML += `<img src=${baseUrl}${json.hero_banner.url} alt="${json.hero_banner_alt_text}"></>`;
    }
    catch (error) {
        displayMessage("error " + error,
                     "Failed to connect " + error,
                     ".message-container");
    }

}
callApiHomebanner();

async function callApiCarousel () {  
    const featuredCarouselUrl = baseUrl + "/products?featured=true";

    var myCarousel = document.querySelector(".carousel-inner");
    var carousel = new bootstrap.Carousel(myCarousel);
   
    try {
        const items = await fetch(featuredCarouselUrl);
        const json = await items.json();

        for (let i = 0; i <json.length; i++) {

            const activeCarousel = (i === 0) ? " active" : "";

            myCarousel.innerHTML += `<div class="carousel-item ${activeCarousel}"  data-bs-interval="3000">` +
                                    `   <img src=${baseUrl}${json[i].image.url} alt="${json[i].image.alternativeText}"class="d-block w-100"></>` +
                                    `   <div class="carousel-caption">`  +
                                    `       <h2>${json[i].title}</h2>` +
                                    `       <h3>Price: ${json[i].price}</h3>` +
                                    `       <button class="btnYellow"><a href="details.html?id=${json[i].id}" class="detailBtn">View details</a></button>` + 
                                    `   </div>` +
                                    `</div>`;
        }   
    }
    catch (error) {
        displayMessage("error " + error,
                     "Failed to connect " + error,
                     ".message-container");
    }

}
callApiCarousel();








