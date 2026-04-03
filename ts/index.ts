import { displayTotalProductsInCart } from "./ui/display-total-products-in-cart.js";
import { handleCartAccess } from "./ui/handle-cart-access.js";
import { handleGallery } from "./ui/handle-gallery.js";
import { handleMenu } from "./ui/handle-menu.js";

document.addEventListener("DOMContentLoaded", () => {
  handleMenu(document);
  handleCartAccess(document);
  displayTotalProductsInCart(document);
  handleGallery(document);
});
