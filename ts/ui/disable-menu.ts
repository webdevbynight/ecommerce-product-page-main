/**
 * Disables the menu on smaller screens.
 * @param menu - The menu element to disable.
 */
export const disableMenu = (menu: HTMLElement): void => {
  menu.classList.remove("active");
  menu.setAttribute("inert", "");
};
