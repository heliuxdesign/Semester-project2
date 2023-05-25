export default function displayMessage(type, message, messageContainer) {
    const element = document.querySelector(messageContainer);
    
    element.innerHTML = `<div class="message ${type}">${message}</div>`;
}


