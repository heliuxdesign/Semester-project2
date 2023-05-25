import displayError from "./js/components/messages.js";
import { baseUrl } from "./js/settings/api.js";


const homeUrl = baseUrl + "/homebanner";

async function callApi () {  

    const heroBanner = document.querySelector(".heroBanner");
    
    try {
        const items = await fetch(homeUrl);
        const json = await items.json();

       heroBanner.innerHTML += `<img src=${baseUrl}${json.homebanner_picture.url}></>`;
        
    }
    catch (error) {
        displayError("error " + error,
                     "Failed to connect " + error,
                     ".message-container");
    }

}
callApi();

