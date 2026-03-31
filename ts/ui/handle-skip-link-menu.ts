import { enableMenu } from "./enable-menu.js";

/**
 * Handles the click event on the skip link menu.
 * @param e - The click event.
 */
export const handleSkipLinkMenu = (e: Event): void => {
  e.preventDefault();
  const closeMenu = document.querySelector(".close-menu");
  const menu = document.getElementById("menu");
  if (closeMenu && menu) {
    closeMenu.classList.toggle("active");
    enableMenu(menu);
  }
  return;
};
