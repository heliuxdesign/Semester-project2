export function getExistingCartProducts() {
    const cartProducts = localStorage.getItem("cartProducts");

    if(cartProducts === null) {
        return[];
    }
    else {
        return JSON.parse(cartProducts);
    }
}

