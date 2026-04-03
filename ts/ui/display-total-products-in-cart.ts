import { agreeInNumber } from "../utils/agree-in-number.js";
import { getTotalProductsInCart } from "../utils/get-total-products-in-cart.js";

/**
 * Displays the total number of products in the cart over the cart access link.
 * @param document - The document object.
 */
export const displayTotalProductsInCart = (document: Document): void => {
  const totalProducts = getTotalProductsInCart();
  const cartAccessLink = document.querySelector(".cart-access a");
  if (cartAccessLink) {
    let cartCount = cartAccessLink.querySelector(".cart-count");
    if (totalProducts) {
      if (!cartCount) {
        cartCount = document.createElement("span");
        cartCount.className = "cart-count";
        cartAccessLink.appendChild(cartCount);
      }
      cartCount.innerHTML = `${totalProducts} <span class="sr-only">${agreeInNumber(totalProducts, ["item", "items"])}</span>`;
    } else cartCount?.remove();
  }
};
