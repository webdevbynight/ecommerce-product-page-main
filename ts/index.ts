import { handleCartAccess } from "./ui/handle-cart-access.js";
import { handleGallery } from "./ui/handle-gallery.js";
import { handleMenu } from "./ui/handle-menu.js";

document.addEventListener("DOMContentLoaded", () => {
  handleMenu(document);
  handleCartAccess(document);
  handleGallery(document);
});
