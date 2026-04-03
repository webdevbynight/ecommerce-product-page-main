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
    const cartCount = cartAccessLink.querySelector(".cart-count") ?? document.createElement("span");
    const cartCountClass = "cart-count";
    if (!cartCount.classList.contains(cartCountClass)) cartCount.classList.add(cartCountClass);
    if (totalProducts) {
      cartCount.innerHTML = `${totalProducts} <span class="sr-only">${agreeInNumber(totalProducts, ["item", "items"])}</span>`;
    } else cartCount.remove();
  }
};
