import { fillCartContent } from "../utils/fill-cart-content.js";

/**
 * Generates the cart.
 * @return A `section` element representing the cart.
 */
export const generateCart = (): HTMLElement => {
  const cart = document.createElement("section");
  cart.id = "cart";
  cart.className = "cart";
  cart.setAttribute("aria-live", "polite");
  cart.setAttribute("aria-atomic", "true");
  const h2 = document.createElement("h2");
  h2.textContent = "Cart";
  cart.appendChild(h2);
  cart.appendChild(fillCartContent());
  return cart;
};
