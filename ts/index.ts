import { handleGallery } from "./ui/handle-gallery.js";
import { handleMenu } from "./ui/handle-menu.js";

document.addEventListener("DOMContentLoaded", () => {
  handleMenu(document);
  handleGallery(document);
});
