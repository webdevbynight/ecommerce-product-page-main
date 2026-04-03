import { removeCart } from "../utils/remove-cart.js";
import { generateCart } from "./generate-cart.js";

/**
 * Handles the click event on the cart access link.
 * @param document - The document object.
 */
export const handleCartAccess = (document: Document): void => {
  const cartAccessLink = document.querySelector<HTMLElement>(".cart-access a");
  if (cartAccessLink) {
    cartAccessLink.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("open");
      const isOpen = this.classList.contains("open");
      const linkText = `${isOpen ? "Close" : "Open"} my cart`;
      const svg = this.querySelector("svg");
      const desc = this.querySelector("desc");
      const cartProfile = this.closest(".cart-profile");
      const profile = cartProfile?.querySelector(".profile");
      this.title = linkText;
      if (svg && desc && cartProfile && profile) {
        svg.setAttribute("aria-label", linkText);
        desc.textContent = linkText;
        if (isOpen) cartProfile.insertBefore(generateCart(), profile);
        else removeCart();
      }
    });
  }
};
